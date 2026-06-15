<template>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>

      <q-step :name="1" title="Inscription" icon="local_shipping" :done="step > 1">
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <q-form ref="formStep1" class="row q-col-gutter-md">

              <div class="col-12">
                <q-input
                  v-model="form.nom"
                  outlined
                  label="Nom complet"
                  placeholder="Jean Dupont"
                  :rules="[(val) => !!val || 'Le nom est obligatoire']"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.email"
                  outlined
                  type="email"
                  label="Email"
                  placeholder="votre@email.fr"
                  color="primary"
                  bg-color="white"
                  :rules="[(val) => !!val || 'L\'email est obligatoire']"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.password"
                  outlined
                  label="Mot de passe"
                  placeholder="********"
                  type="password"
                  :rules="[
                    (val) => !!val || 'Le mot de passe est obligatoire',
                    (val) => val.length >= 6 || 'Le mot de passe doit contenir au moins 6 caractères',
                  ]"
                />
                </div>

              <div class="col-12">
                <q-input
                  v-model="form.adresse"
                  outlined
                  label="Adresse"
                  placeholder="15 Rue de la Paix"
                  :rules="[(val) => !!val || 'L\'adresse est obligatoire']"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.ville"
                  outlined
                  label="Ville"
                  placeholder="Paris"
                  :rules="[(val) => !!val || 'La ville est obligatoire']"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.codePostal"
                  outlined
                  label="Code Postal"
                  placeholder="75002"
                  :rules="[
                    (val) => !!val || 'Le code postal est obligatoire',
                    (val) => /^\d{5}$/.test(val) || 'Le code postal doit contenir 5 chiffres',
                  ]"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.telephone"
                  outlined
                  label="Téléphone"
                  placeholder="+33 6 12 34 56 78"
                  type="tel"
                  :rules="[
                    (val) => !!val || 'Le téléphone est obligatoire',
                    (val) => val.length >= 10 || 'Le téléphone est trop court',
                  ]"
                />
              </div>

              <div class="col-12 q-mt-sm row q-gutter-sm">
                <q-btn
                unelevated
                color="primary"
                label="Envoyer le message"
                icon-right="send"
                class="full-width"
                size="md"
                type="submit"
                @click="saveForm()"
              />
              </div>

            </q-form>
          </q-card-section>
        </q-card>
      </q-step>

    </q-stepper>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

const step = ref(1)
const router = useRouter()

const form = reactive({
  nom: '',
  email: '',
  password: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: ''
})

onMounted(() => {
  const savedForm = LocalStorage.getItem('form-inscription')
  if (savedForm) {
    Object.assign(form, savedForm)
  }
})

async function saveForm() {
  LocalStorage.set('form-inscription', form)
  step.value = 2
  await goToProduit()
}

async function goToProduit() {
  await router.push('/')
}


</script>