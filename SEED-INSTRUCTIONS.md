# SEED – MJ Créations (Production)

1) Créez l'utilisateur administrateur dans Authentication, récupérez son UID puis ajoutez dans Firestore :
```
users/{UID_ADMIN} => { role: 'admin', displayName: 'Admin MJ' }
```
2) (Optionnel) Créez un utilisateur client et notez son UID.
3) Déployez règles + hosting + functions :
```
firebase deploy --only firestore:rules,hosting,functions
```
4) Ouvrez /seed.html, saisissez l'UID Client et cliquez "Créer les données".
5) Vérifiez :
- `/prospects` (vitrine)
- `/planning/{YYYY-MM-DD}/rendezVous` (RDV)
- `/chantiers` (chantier)
- `/clients/{UID}/factures/*` (facture créée)
- `/facturesFlat` + `/comptabilite/{exo}/journal` (mirror + VE via Cloud Functions)
