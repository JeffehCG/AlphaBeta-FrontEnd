<template>
  <div class="dropdown">
    <div class="container">
      <b-form>
        <b-form-group label="Titulo" label-for="lb-titulo" label-size="lg">
          <b-form-input size="lg" id="lb-titulo" v-model="exercise.ds_classificacao"></b-form-input>
        </b-form-group>
        <b-form-group label="Texto" label-for="lb-texto" label-size="lg">
          <b-form-textarea size="lg" id="lb-texto" v-model="exercise.ds_texto"></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <b-button size="lg" variant="primary" @click="addParans">Preencher parametros</b-button>
        </b-form-group>
        <!-- <b-col md="6" sm="12"> -->
        <b-form-group>
          <div class="files">
            <div v-if="parameters.palavra1 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file1" ref="file1" multiple>
              </div>
              <b-form-input v-model="parameters.palavra1.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra1 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file2" ref="file2" multiple>
              </div>
              <b-form-input v-model="parameters.palavra2.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra3 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file3" ref="file3" multiple>
              </div>
              <b-form-input v-model="parameters.palavra3.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra4 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file4" ref="file4" multiple>
              </div>
              <b-form-input v-model="parameters.palavra4.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra5 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file5" ref="file5" multiple>
              </div>
              <b-form-input v-model="parameters.palavra5.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra6 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file6" ref="file6" multiple>
              </div>
              <b-form-input v-model="parameters.palavra6.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra7 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file7" ref="file7" multiple>
              </div>
              <b-form-input v-model="parameters.palavra7.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra8 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file8" ref="file8" multiple>
              </div>
              <b-form-input v-model="parameters.palavra8.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
            <div v-if="parameters.palavra9 != null" class="card">
              <div class="ipFile_custom" @click="file_mechanic($event)">
                <img src="../../../../src/assets/img_icon.png">
                <input type="file" id="file9" ref="file9" multiple>
              </div>
              <b-form-input v-model="parameters.palavra9.nm_texto" placeholder="Parametro"></b-form-input>
            </div>
          </div>
        </b-form-group>
        <!-- </b-col> -->
        <!-- </b-row> -->
        <div class="btn_footer">
            <b-button variant="success" size="lg" v-if="updateExercise == false" @click="insert">Salvar</b-button>
            <b-button variant="success" size="lg" v-if="updateExercise == true" @click="update">Alterar</b-button>
            <b-button variant="info" size="lg" @click="loadExercise">simular</b-button>
        </div>
      </b-form>
    </div>

    <hr>
    <div class="container">
      <div class="lacuns_area" v-html="exercise_processed.phrase"></div>
      <br>
      <br>
      <div class="words_area" v-html="exercise_processed.params"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "Dropdown",
  computed: mapState(["user"]),
  data: function() {
    return {
      updateExercise: false,
      qtParansUpdadeBefore: 0,
      exercise: {},
      parameters: {},
      exercise_processed: {
        phrase: "",
        params: ""
      },
      exerciseCreated: false
    };
  },
  methods: {
    async loadExerciseUpdade() {
      if (this.$route.params.id) {
        let url = `${baseApiUrl}/exerciseComplete/${this.$route.params.id}`;
        axios
          .get(url)
          .then(res => {
            this.exercise = res.data;
          })
          .catch(showError);

        url = `${baseApiUrl}/exerciseComplete/params/${this.$route.params.id}`;
        await axios
          .get(url)
          .then(res => {
            if (res.data[0]) {
              this.parameters.palavra1 = res.data[0];
            }
            if (res.data[1]) {
              this.parameters.palavra2 = res.data[1];
            }
            if (res.data[2]) {
              this.parameters.palavra3 = res.data[2];
            }
            if (res.data[3]) {
              this.parameters.palavra4 = res.data[3];
            }
            if (res.data[4]) {
              this.parameters.palavra5 = res.data[4];
            }
            if (res.data[5]) {
              this.parameters.palavra6 = res.data[5];
            }
            if (res.data[6]) {
              this.parameters.palavra7 = res.data[6];
            }
            if (res.data[7]) {
              this.parameters.palavra8 = res.data[7];
            }
            if (res.data[8]) {
              this.parameters.palavra9 = res.data[8];
            }
          })
          .catch(showError);

        for (let i in this.parameters) {
          this.qtParansUpdadeBefore = this.qtParansUpdadeBefore + 1;
        }

        //event listeners para a mecanica dos input files
        // let inputs = document.querySelectorAll("input[type=file]");
      }
    },

    async update() {
      let url = `${baseApiUrl}/exerciseComplete/${this.exercise.cd_exercicio}`;

      await axios
        .put(url, this.exercise)
        .then(async () => {
          let x = 0;
          for (let i in this.parameters) {
            x = x + 1;
            if (x <= this.qtParansUpdadeBefore) {
              if (this.parameters[i].ds_img) {
                url = `${baseApiUrl}/paransExercise/${
                  this.parameters[i].cd_parametro
                }/${this.exercise.cd_exercicio}`;

                let formData = new FormData();
                if (i == "palavra1" && this.$refs.file1.files[0]) {
                  formData.append("ds_img", this.$refs.file1.files[0]);
                }
                if (i == "palavra2" && this.$refs.file2.files[0]) {
                  formData.append("ds_img", this.$refs.file2.files[0]);
                }
                if (i == "palavra3" && this.$refs.file3.files[0]) {
                  formData.append("ds_img", this.$refs.file3.files[0]);
                }
                if (i == "palavra4" && this.$refs.file4.files[0]) {
                  formData.append("ds_img", this.$refs.file4.files[0]);
                }
                if (i == "palavra5" && this.$refs.file5.files[0]) {
                  formData.append("ds_img", this.$refs.file5.files[0]);
                }
                if (i == "palavra6" && this.$refs.file6.files[0]) {
                  formData.append("ds_img", this.$refs.file6.files[0]);
                }
                if (i == "palavra7" && this.$refs.file7.files[0]) {
                  formData.append("ds_img", this.$refs.file7.files[0]);
                }
                if (i == "palavra8" && this.$refs.file8.files[0]) {
                  formData.append("ds_img", this.$refs.file8.files[0]);
                }
                if (i == "palavra9" && this.$refs.file9.files[0]) {
                  formData.append("ds_img", this.$refs.file9.files[0]);
                }

                formData.append("cd_parametro", x);
                formData.append("nm_texto", this.parameters[i].nm_texto);
                this.parameters[i].form = formData;

                await axios
                  .put(url, this.parameters[i].form, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                  })
                  .then(() => {})
                  .catch(showError);
              }
            } else {
              let formData = new FormData();

              if (i == "palavra1") {
                formData.append("ds_img", this.$refs.file1.files[0]);
              }
              if (i == "palavra2") {
                formData.append("ds_img", this.$refs.file2.files[0]);
              }
              if (i == "palavra3") {
                formData.append("ds_img", this.$refs.file3.files[0]);
              }
              if (i == "palavra4") {
                formData.append("ds_img", this.$refs.file4.files[0]);
              }
              if (i == "palavra5") {
                formData.append("ds_img", this.$refs.file5.files[0]);
              }
              if (i == "palavra6") {
                formData.append("ds_img", this.$refs.file6.files[0]);
              }
              if (i == "palavra7") {
                formData.append("ds_img", this.$refs.file7.files[0]);
              }
              if (i == "palavra8") {
                formData.append("ds_img", this.$refs.file8.files[0]);
              }
              if (i == "palavra9") {
                formData.append("ds_img", this.$refs.file9.files[0]);
              }

              formData.append("cd_parametro", x);
              formData.append("nm_texto", this.parameters[i].nm_texto);
              formData.append("cd_exercicio", this.exercise.cd_exercicio);
              this.parameters[i].form = formData;

              url = `${baseApiUrl}/paransExercise`;
              await axios
                .post(url, this.parameters[i].form, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                .then(() => {})
                .catch(showError);
            }
          }
          this.$toasted.global.defaultSuccess();
          this.exercise = {};
          this.parameters = {};
          this.$router.push("/listExercise");
        })
        .catch(showError);
    },

    async insert() {
      let qt = 0;
      for (let i in this.parameters) {
        let formData = new FormData();

        qt = qt + 1;
        if (i == "palavra1") {
          formData.append("ds_img", this.$refs.file1.files[0]);
        }
        if (i == "palavra2") {
          formData.append("ds_img", this.$refs.file2.files[0]);
        }
        if (i == "palavra3") {
          formData.append("ds_img", this.$refs.file3.files[0]);
        }
        if (i == "palavra4") {
          formData.append("ds_img", this.$refs.file4.files[0]);
        }
        if (i == "palavra5") {
          formData.append("ds_img", this.$refs.file5.files[0]);
        }
        if (i == "palavra6") {
          formData.append("ds_img", this.$refs.file6.files[0]);
        }
        if (i == "palavra7") {
          formData.append("ds_img", this.$refs.file7.files[0]);
        }
        if (i == "palavra8") {
          formData.append("ds_img", this.$refs.file8.files[0]);
        }
        if (i == "palavra9") {
          formData.append("ds_img", this.$refs.file9.files[0]);
        }

        formData.append("cd_parametro", qt);
        formData.append("nm_texto", this.parameters[i].nm_texto);
        formData.append("cd_professor", this.user.cpf);
        this.parameters[i].form = formData;
      }

      ///////// Inserindo exercicio

      let url = `${baseApiUrl}/exerciseComplete`;
      this.exercise.nm_url = "dragDrop.js";
      this.exercise.cd_professor = this.user.cpf;

      await axios
        .post(url, this.exercise)
        .then(async () => {
          for (let x in this.parameters) {
            url = `${baseApiUrl}/paransExercise`;
            await axios
              .post(url, this.parameters[x].form, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(() => {})
              .catch(showError);
          }
          this.$toasted.global.defaultSuccess();
          this.exercise = {};
          this.parameters = {};
        })
        .catch(showError);
    },

    deleteParansNull() {
      for (let y in this.parameters) {
        if (this.parameters[y].nm_texto == null) delete this.parameters[y];
      }
    },

    async addParans() {
      this.deleteParansNull();

      let qt = 0;
      if (this.exercise.ds_texto != null) {
        for (let i = 0; i <= this.exercise.ds_texto.length; i++) {
          if ((await this.exercise.ds_texto.charAt(i)) === "#") {
            qt = qt + 1;
            if (qt == 1 && this.parameters.palavra1 == null) {
              this.parameters.palavra1 = new Object();
              this.parameters.palavra1.codigo = qt;
            }
            if (qt == 2 && this.parameters.palavra2 == null) {
              this.parameters.palavra2 = new Object();
              this.parameters.palavra2.codigo = qt;
            }
            if (qt == 3 && this.parameters.palavra3 == null) {
              this.parameters.palavra3 = new Object();
              this.parameters.palavra3.codigo = qt;
            }
            if (qt == 4 && this.parameters.palavra4 == null) {
              this.parameters.palavra4 = new Object();
              this.parameters.palavra4.codigo = qt;
            }
            if (qt == 5 && this.parameters.palavra5 == null) {
              this.parameters.palavra5 = new Object();
              this.parameters.palavra5.codigo = qt;
            }
            if (qt == 6 && this.parameters.palavra6 == null) {
              this.parameters.palavra6 = new Object();
              this.parameters.palavra6.codigo = qt;
            }
            if (qt == 7 && this.parameters.palavra7 == null) {
              this.parameters.palavra7 = new Object();
              this.parameters.palavra7.codigo = qt;
            }
            if (qt == 8 && this.parameters.palavra8 == null) {
              this.parameters.palavra8 = new Object();
              this.parameters.palavra8.codigo = qt;
            }
            if (qt == 9 && this.parameters.palavra9 == null) {
              this.parameters.palavra9 = new Object();
              this.parameters.palavra9.codigo = qt;
            }
          }
        }
      }
      this.exercise.ds_texto = this.exercise.ds_texto + " ";

      //   setTimeout(() => {
      // setTimeout to put this into event queue
      // this.file_listener();
      // executed after render
      //   }, 0);
    },

    async loadExercise() {
      this.exercise_processed.phrase = "";

      let new_phrase = "";

      try {
        let phrase_split = this.exercise.ds_texto.split("#");
        let qt_params = this.exercise.ds_texto.split("#").length - 1;

        [].map.call(
          phrase_split,
          await function(obj, i) {
            new_phrase += `<div class='phrase'>${obj}</div>`;
            new_phrase +=
              i < qt_params
                ? "<div id='lacum_" + (i + 1) + "' class='empty'></div>"
                : "";
          }
        );
        this.exercise_processed.phrase = "";
        this.exercise_processed.phrase = new_phrase;
        this.loadParansExercise();
      } catch (e) {
        showError;
      }
    },

    async loadParansExercise() {
      let paramsDOM = "";
      let imageRefs = Object.values(this.$refs);
      let words = Object.values(this.parameters);

      [].map.call(
        words,
        await function(obj, i) {
          let imageUrl;
          try {
            imageUrl = `<img src='${URL.createObjectURL(
              imageRefs[i].files[0]
            )}'/>`;
          } catch (e) {
            imageUrl = "";
          }
          paramsDOM += `<div class='words-container'><div>${imageUrl}</div><div id='word_${
            obj.codigo
          }' class='fill' draggable='true'>${obj.nm_texto}</div></div>`;
        }
      );
      this.exercise_processed.params = paramsDOM;
      setTimeout(() => {
        // setTimeout to put this into event queue
        this.construct_exercise();
        // executed after render
      }, 0);
    },

    construct_exercise() {
      let filled = document.querySelectorAll(".fill");
      let empties = document.querySelectorAll(".empty");

      let word_hold;

      //loop throught empties and call drag events
      for (const empty of empties) {
        if (empty.children.length > 0)
          empty.removeChild(empty.lastElementChild);

        empty.removeEventListener("dragover", dragOver);
        empty.removeEventListener("dragenter", dragEnter);
        empty.removeEventListener("dragleave", dragLeave);
        empty.removeEventListener("drop", dragDrop);

        empty.addEventListener("dragover", dragOver);
        empty.addEventListener("dragenter", dragEnter);
        empty.addEventListener("dragleave", dragLeave);
        empty.addEventListener("drop", dragDrop);
      }

      // Fill  Listeners
      for (const fill of filled) {
        fill.removeEventListener("dragstart", dragStart);
        fill.removeEventListener("dragend", dragEnd);

        fill.addEventListener("dragstart", dragStart);
        fill.addEventListener("dragend", dragEnd);
      }

      //dragFunction
      function dragStart() {
        word_hold = this.id;
        this.className += " hold";
        setTimeout(() => (this.className = "invisible"), 0);
      }

      function dragEnd() {
        this.className = "fill";
      }

      function dragOver(e) {
        e.preventDefault();
      }

      function dragEnter(e) {
        e.preventDefault();
        this.className += " hovered";
      }

      function dragLeave() {
        this.className = "empty";
      }

      function dragDrop() {
        this.className = "empty";
        if (this.id == "lacum_" + word_hold.split("_")[1])
          this.append(document.getElementById(word_hold));
      }
    },

    file_mechanic(event) {
      let targetId = event.currentTarget.lastElementChild.click();
      console.log(targetId);
    },

    // adiciona event listeners aos input files para o preview das imgs
    file_listener() {
      let inputs = document.querySelectorAll("input[type=file]");

      if (inputs.length > 0) {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener(
            "change",
            function() {
              if (this.files.length === 0) return;

              // gets first selected file
              let file = this.files[0];

              //   document.querySelector("#info").innerText =
              //     "Name: " +
              //     file.name +
              //     ", Size: " +
              //     file.size +
              //     ", Type: " +
              //     file.type +
              //     ", Last Modified: " +
              //     file.lastModified;
              // Using FileReader to display the image content
              var reader = new FileReader();
              reader.onload = function(e) {
                inputs[i].parentNode.firstElementChild.src = e.target.result;
              };
              reader.readAsDataURL(file);
            },
            false
          );
        }
      }
    }
  },
  watch: {
        $route(to){ 
            this.updateExercise = false,
            this.qtParansUpdadeBefore = 0,
            this.exercise = {},
            this.parameters = {},
            this.exercise_processed = {
              phrase: "",
              params: ""
            },
            this.exerciseCreated = false
        }
    },
  mounted() {
    this.loadExerciseUpdade();
    if (this.$route.params.id) {
      this.updateExercise = true;
    }
  },

  updated() {
    this.file_listener();
  }
};
</script>


<style>
body {
  /* background: darksalmon; */
}

div.fill {
  /* background-image: url('http://source.unsplash.com/random/150x150'); */
  position: relative;
  height: 35px;
  width: 130px;
  text-align: center;
  top: 0px;
  left: 0px;
  cursor: pointer;
  border: 3px dotted lightblue;
  border-radius: 5px;
}

div.empty {
  display: inline-block;
  height: 41px;
  width: 131px;
  margin: 0;
  border: 3px salmon solid;
  border-radius: 5px;
  background-color: white;
}

/* .lacuns_area {
  display: flex;
  flex-direction: row;
} */

/* .lacuns_area .phrase {
  line-height: 40px;
  margin: 0 7px;
} */

.hold {
  border: solid #ccc 4px;
}

.empty.hovered {
  background: #f4f4f4;
  border-style: dashed;
}

.invisible {
  display: none;
}

/* .words_area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.words-container {
  width: 150px;
  display: flex;
  flex-direction: column;
} */

.container {
  width: 90vw;
}

#lb-texto {
  min-height: 120px;
}

.ipFile_custom input[type="file"] {
  display: none;
}

.ipFile_custom img{
    width: 200px;
    height: 200px;
}

.ipFile_custom img:hover{
    opacity:0.55;
    cursor: pointer; 
}

.files{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.files div{
    margin: 10px 0;
}

.card{
    width: 200px;
}

.btn_footer{
    display: flex;
    justify-content: space-between;
}

.lacuns_area{
    align-items: center;
    display: flex;
    max-width: 100vw;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    
}

.lacuns_area .phrase{
    width: auto;
    white-space: nowrap;
}

.phrase_area div{
    /* margin-bottom: 10px; */
}
.lacuns_area .empty{
    margin: 5px 5px;
}

.words_area{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.words-container{
    width: 130px;
    max-height: 200px;
    height: 170px;
    display: flex;
    flex-direction: column;
}

.words-container div:first-child{
    height: 130px;
    margin-bottom: 5px;
} 

.words-container div img
/* .words-container:first-child */
/* .lacuns_area div  */
{
    position: relative;
    right: 3px;
    width: 134px;
    height: 130px;
    margin-bottom: 5px;
    background-color: red;
}
</style>
