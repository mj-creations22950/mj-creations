\
// Firebase Functions for MJ Créations (PRODUCTION)
// - Mirror clients/{clientId}/factures/* into /facturesFlat
// - Create journal entry (VE) on facture creation
// - Create BQ entry when facture marked as 'payée'
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onClientInvoiceCreated = functions.firestore
  .document('clients/{clientId}/factures/{factureId}')
  .onCreate(async (snap, ctx) => {
    const f = snap.data();
    const clientId = ctx.params.clientId;
    const factureId = ctx.params.factureId;
    const createdAt = admin.firestore.FieldValue.serverTimestamp();

    await db.collection('facturesFlat').doc(factureId).set({
      ...f, clientId, factureId, createdAt
    }, { merge: true });

    const exo = (new Date()).getFullYear().toString();
    await db.collection('comptabilite').doc(exo).collection('journal').add({
      journal: 'VE',
      date: f.date ? admin.firestore.Timestamp.fromDate(new Date(f.date)) : createdAt,
      label: `Vente ${f.num || factureId} ${f.client || ''}`.trim(),
      account: '701',
      debit: 0,
      credit: Number(f.ht || 0),
      tva: Number(f.vat || 0),
      ttc: Number(f.ttc || 0),
      piece: f.num || factureId,
      clientId,
      createdAt
    });

    await db.collection('clients').doc(clientId).collection('messages').add({
      from: 'system',
      text: `Votre facture ${f.num || factureId} est disponible.`,
      ts: createdAt
    });

    return true;
  });

exports.onInvoicePaid = functions.firestore
  .document('facturesFlat/{factureId}')
  .onUpdate(async (change, ctx) => {
    const before = change.before.data();
    const after = change.after.data();
    if (before.status === after.status) return null;
    if ((after.status || '').toLowerCase() !== 'payée') return null;

    const exo = (new Date()).getFullYear().toString();
    const amount = Number(after.ttc || 0);
    await db.collection('comptabilite').doc(exo).collection('journal').add({
      journal: 'BQ',
      date: admin.firestore.FieldValue.serverTimestamp(),
      label: `Règlement ${after.num || ctx.params.factureId}`,
      account: '512',
      debit: 0,
      credit: amount,
      piece: after.num || ctx.params.factureId,
      clientId: after.clientId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return true;
  });
