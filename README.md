# Exercice recap examen JS web 2
Le but de cet exercice est de créer un blog sur lequel vous pouvez poster des messages, les modifier ou les supprimer.

Une partie backend s'occupera d'effectuer les actions précédement citées pour un message.

Une partie frontend permettra d'afficher les différents messages et de proposer les actions disponnibles via le backend sur ceux-ci.

## Partie 1 - BACKEND
Les données doivent persister et donc ne pas disparaitre lors du redemarage de l'api.
Pour les actions suivantes, créer, modifier et supprimer un post. Vous devez vérifier que l'utilisateur est connecté et est admin;
- Créer un post : pour un post on retiens son id et le message. Utilisez le package uuid pour gérer les id.

- Modifier un post : il doit être possible de modifier le message d'un post.

- Supprimer un post : il doit être possible de supprimer un post.

- Recupérer les posts : il doit être possible de recuperer l'ensemble des posts éxistants.

## Partie 2 - FRONTEND

- Vous devez, dans la navbar, proposer à l'utilisateur de se connecter ou se déconnecter.
  Pensez à stocker les informations lors du login et à les supprimer lors du logout.

- Pour l'utilisateur connecté, vous devez afficher un formulaire permettant de créer un post.

- Vous devez afficher l'ensemble des posts éxistants. Pour afficher les posts en partant du plus récent, utilisez la méthode reverse() sur un tableau.

## Bonus

- Pour chaque post, si l'utilisateur est connecté, vous devez afficher des boutons permettants de modifier et de supprimer le post.