<template>
  <div class="box_publi">
  <label for="publication">Publication<input size="40" type="text" name="publication" ref="publication" :value="this.publi.publication"></label>
  <button @click.prevent="modification">Changer</button>
  </div>
</template>

<script>
import './../assets/css/style.css';

export default {
  name: "MajActu",
  data() {
    return {
      publi: {}
    };
  },
  methods: {
    //Modification de la publication
    //Récupération de la valeur de la publication
    //puis mise à jour
    modification: function () {
    //Inclusion des données récupérers
    //dans un nouvelle objet FormData
    const fd = new FormData();
    //Associe publication à la valeur référence de publication
      fd.append("publication", this.$refs.publication.value);
      return fetch(`http://localhost:3000/api/publica/${this.$route.query.id}`, {
        method: "PUT",
        body: fd,
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
        })
        .then((response) => response.json())
        .then(() => (location.reload()))
        .catch((error) => console.log(error));
    },
  },
  //Hook created
  //Récupération des publication puis stockage dans publi 
  created: function () {
    return fetch(`http://localhost:3000/api/publica/${this.$route.query.id}`, 
    { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then((response) => response.json())
    .then((response) => { this.publi = response; })
    .catch((error) => console.log(error));
  },
};
</script>
