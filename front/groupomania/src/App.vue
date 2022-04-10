<template>
  <div id="app">
      <template v-if="!pConnexion()">
        <div class="g_log">
        <div class="logo_centre"><img class="logo_taille" src="./assets/img/img-web/logo.png" alt="logo-groupomania"></div>
        <form class="g_log_box" v-if="mode == 'connexionC'">
            <label class="g_box_label" for="email">Email<input type="text" class="g_box_input" name="email" id="emailC" placeholder="adresse@email.com"></label>
            <label class="g_box_label" for="mdp">Mot de passe<input type="password" class="g_box_input" name="mdp" id="mdpC" placeholder="mot de passe"></label>
            <button class="g_button" v-on:click.prevent="connexion">Connexion</button>
        </form>
        <form class="g_log_box" v-if="mode == 'inscriptionI'">
            <label class="g_box_label">Email<input class="g_box_input" type="text" name="email" id="emailI" placeholder="adresse email"></label>
            <label class="g_box_label" for="mdp">Mot de passe<input class="g_box_input" type="password" name="mdp" id="mdpI" placeholder="mot de passe"></label>
            <label class="g_box_label">Nom<input class="g_box_input" type="text" name="nom" id="nomI" placeholder="nom"></label>
            <label class="g_box_label">Prenom<input class="g_box_input" type="text" name="prenom" id="prenomI" placeholder="prénom"></label>
            <button class="g_button" v-on:click.prevent="inscription">Inscription</button>
        </form>
        <p class="g_log_box" v-if="mode == 'connexionC'"><span @click="inscriptionI()">Accéder à la page d'inscription</span></p>
        <p class="g_log_box" v-else><span @click="connexionC()">Retour à la page de connexion</span></p>
        </div>
      </template>
      <template v-else>
      <div class="logo_centre"><img class="logo_taille_2" src="./assets/img/img-web/logo.png" alt="logo-groupomania"></div>
        <nav>
          <li><span @click="accueil()">Accueil</span></li>
          <li><span @click="mur()">Mur d'actualité</span></li>
          <li><span @click="compte()">Mon compte</span></li>
          <li><span @click="deconnexion()">Déconnexion</span></li>
          </nav>
          <div class="box_accueil" v-if="modeA == 'accueil'">
            <p>Bienvenue sur le réseaux social de l'entreprise.</p>
            <p>Veuillez trouver ci-joint les dernières actualités.</p>
            <p>Bonne navigation !</p>
            <img class= "gif" src="./assets/img/accueil-web.gif" alt="Gif Accueil">
            </div>
            <div v-if="modeA == 'mur'">
            <div class="box_publi">
              <label for="uti_info">Nom<input type="text" name="uti_info" id="uti_info"></label>
              <label for="publication">Votre message<input size="30" type="text" name="publication" id="publication"></label>
              <label for="image">Image<input type="file" name="image" id="image">
            <button @click.prevent="envoisPublication">Publier</button>
            </label>
            </div>
            <article v-for="publi in publica" :key="publi.id">
            <div class="box_accueil">
              <div class="compte_centre_2">
                <h3>{{ publi.uti_info }}</h3>
                <p>NOUVELLE PUBLICATION !!</p>
              </div>
                <p>{{ publi.publication }}</p>
                <img :src="publi.image" onerror="this.style.display='none'">
                <div class="box_com_supp">
                <router-link :to="{ path: '/majactu', query: {id: `${publi.id}`}}"><button>Modifier</button></router-link>
                <button @click="suppPubli(publi.id)">Supprimer</button>
                </div>
            </div>
            </article>
            </div>
            <div v-if="modeA == 'compte'">
              <div class="box_accueil">
                <div class="compte_centre">
                  <p>Récupitulatif de mes informations :</p>
                  <p>Nom : {{ utilisateurs.nom }}</p>
                  <p>Prénom : {{ utilisateurs.prenom }}</p>
                  <p>Email : {{ utilisateurs.email }}</p>
                </div>
              </div>
            <div class="box_acceuil_supp">
              <button @click="suppCompte" type="submit">SUPPRIMER LE COMPTE</button>
            </div>
            </div>
      </template>
    <router-view />
  </div>
</template>

<script>
import './assets/css/style.css';

export default {
  name: "App",
  data() {
    return {
      mode: "connexionC",
      publica: [],
      utilisateurs: [],
      modeA : "mur"
    };
  },
  methods: {
    //Initialisation du mode inscriptionI
    inscriptionI: function () {
      this.mode = "inscriptionI";
    },
    //Initialisation du mode connexionC
    connexionC: function () {
      this.mode = "connexionC";
    },
    //Initialisation du mode accueil
    accueil: function () {
      this.modeA = "accueil";
    },
    //Initialisation du mode mur
    mur: function () {
      this.modeA = "mur";
    },
    //Initialisation du mode compte
    compte: function () {
      this.modeA = "compte";
    },
    //Permet l'inscription d'un compte
    //Transmition des informations
    //puis inscription du nouvel utilisateur
    inscription: function () {
      return fetch("http://localhost:3000/api/auth/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        //Récupére l'email renseigné dans le champs par l'utilisateur
        email: document.querySelector("#emailI").value,
        //Récupére le mot de passe renseigné dans le champs par l'utilisateur
        mdp: document.querySelector("#mdpI").value,
        //Récupére le nom renseigné dans le champs par l'utilisateur
        nom: document.querySelector("#nomI").value,
        //Récupére le prénom renseigné dans le champs par l'utilisateur
        prenom: document.querySelector("#prenomI").value
        })
      })
      .then((response) => response.json())
      //Reload de la page lors de l'inscription
      .then(() => { location.reload(); })
      .catch((error) => console.log(error));
    },
    //Permet la connexion d'un compte
    //Transmition et vérification des informations
    //et si valide alors connexion
    connexion: function () {
      return fetch("http://localhost:3000/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        //Récupére l'email renseigné dans le champs par l'utilisateur
        email: document.querySelector("#emailC").value,
        //Récupére le mot de passe renseigné dans le champs par l'utilisateur
        mdp: document.querySelector("#mdpC").value
        })
      })
      .then((response) => response.json())
      .then((response) => {
        //Convertion et envoi en JSON dans le localStorage les informations récupérer
        //lors de la connexion de l'utilisateur
        localStorage.setItem("id_uti", JSON.stringify(response.id_uti));
        localStorage.setItem("uti_rang", JSON.stringify(response.uti_rang));
        localStorage.setItem("token", JSON.stringify(response.token));
        //Reload de la page lors de la connexion
        location.reload();
      })
      .catch((error) => console.log(error));
    },
    //Vérifie si l'utilisateur est connecté 
    //sinon retour sur la page de connexion
    pConnexion: function () {
    const id_uti = JSON.parse(localStorage.getItem("id_uti"));
    if (!id_uti)
    { return false;
    } else { return true; }
    },
    //Envois les données émis par l'utilisateur lors de la création d'une publication
    envoisPublication: function () {
    //Inclusion des données récupérers
    //dans un nouvelle objet FormData
    const fd = new FormData();
    //Associe image avec l'image récupéré #publiImage
    fd.append("image", document.querySelector("#image").files[0]);
    //Associe publication avec la valeur contenu dans #publication
    fd.append("publication", document.querySelector("#publication").value);
    //Associe uti_info avec la valeur contenu dans #uti_info
    fd.append("uti_info", document.querySelector("#uti_info").value);
    //Associe id_uti avec l'id_uti contenu dans le localStorage
    fd.append("id_uti", localStorage.getItem("id_uti"));

    return fetch("http://localhost:3000/api/publica", {
      method: "POST",
      body: fd,
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
    })
    .then((response) => response.json())
    //Reload la page une fois la publication créer
    .then(() => { location.reload(); })
    .catch((error) => console.log(error));
    },
    //Permet la supresponsesion d'une publication
    //Passage en paramètre de l'id de la publication à supprimer
    suppPubli: function (publipubli) {
      return fetch(`http://localhost:3000/api/publica/${publipubli}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
      })
      .then((response) => response.json())
      //Reload la page une fois la publication effacé
      .then(() => { location.reload(); })
      .catch((error) => console.log(error));
    },
    //Permet à l'utilisateur la suppresponsesion du compte
    suppCompte: function () {
      //Récupére l'id_uti de l'utilisateur dans le localStorage
      //puis stocké dans la variable id_uti
      const id_uti = JSON.parse(localStorage.getItem("id_uti"));
      fetch(`http://localhost:3000/api/auth/${id_uti}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
      })
      .then((response) => response.json())
      .then(() => {
        //Efface le contenu du localStorage
        localStorage.clear();
        //Reload la page une fois le contenu du localStorage effacé
        location.reload();
      })
      .catch((error) => console.log(error));
    },
    //Récupére les publications
    tPublications() {
      return fetch("http://localhost:3000/api/publica", {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
      })
      .then((response) => response.json())
      //Inversion des publications trouvées vers un ordre décroissant
      //afin de données une meilleure visibilités aux publications récentes
      //Stockage des publications trouvées dans publica
      .then((tPublication) => { tPublication.reverse(); this.publica = tPublication; })
      .catch((error) => console.log(error));
    },
    //Récupére les informations utilisateurs
    utiInfos() {
      const id_uti = JSON.parse(localStorage.getItem("id_uti"));
      return fetch(`http://localhost:3000/api/uti/${id_uti}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
      })
      .then((response) => response.json())
      //Stockage des publications trouvées dans publica
      .then((utiInfos) => { this.utilisateurs = utiInfos; })
      .catch((error) => console.log(error));
    },
    //Permet à l'utilisateur la deconnexion du compte
    deconnexion: () => {
      //Efface le contenu du localStorage
      localStorage.clear();
      //Reload la page une fois le contenu du localStorage effacé
      location.reload();
    },
  },
  //Hook created
  created() {
    //Apelle la method tPublication afin d'afficher
    //les publications trouvées
    this.tPublications();
    //Apelle la method utiInfos afin d'afficher
    //les informations utilisateurs
    this.utiInfos();
  }
};
</script>
