<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      

      <div class="col">
        <section class="bg-blue-grey-1 q-px-md q-py-xl rounded-borders">
          <div class="contact-wrapper">
            <div class="text-h6 text-primary text-weight-bold text-center q-mb-lg">
              Contactez-nous
            </div>

            <q-form ref="formStep3" class="q-gutter-md" @submit.prevent="payOrder">
              <q-input
                v-model="form.nom"
                outlined
                label="Nom"
                placeholder="Votre nom complet"
                color="primary"
                bg-color="white"
                :rules="[
                  val => !!val || 'Le nom est obligatoire'
                ]"
              />

              <q-input
                v-model="form.email"
                outlined
                type="email"
                label="Email"
                placeholder="votre@email.fr" 
                color="primary"
                bg-color="white"
                :rules="[
                  val => !!val || 'email obligatoire',
                ]"
              />

              <q-input
                v-model="form.sujet"
                outlined
                label="Sujet"
                placeholder="Comment pouvons-nous vous aider ?"
                color="primary"
                bg-color="white"
                :rules="[
                  val => !!val || 'Le sujet est obligatoire'
                ]"
              />

              <q-input
                v-model="form.message"
                outlined
                type="textarea"
                autogrow
                label="Message"
                placeholder="Décrivez votre demande en détail..."
                color="primary"
                bg-color="white"
                :rules="[
                  val => !!val || 'Le message est obligatoire'
                ]"
              />

              <q-btn
                unelevated
                color="primary"
                label="Envoyer le message"
                icon-right="send"
                class="full-width"
                size="md"
                type="submit"
              />
            </q-form>
          </div>
        </section>

        <footer class="bg-grey-3 q-px-md q-py-xl q-mt-md rounded-borders">
          <div class="row q-col-gutter-lg items-start">
            <div class="col-12 col-md-6">
              <div class="text-h6 text-primary text-weight-bold">SofaLand</div>
              <div class="text-body2 text-grey-7 q-mt-sm">
                © 2024 SofaLand. Qualité et confort pour votre maison.
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="column q-gutter-sm">
                <div class="text-body2">Téléphone : 01 23 45 67 89</div>
                <div class="text-body2">Email : support@sofaland.fr</div>
                <div class="text-body2">Horaires : Lun-Ven 9h-18h</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, QForm } from 'quasar'
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

const $q = useQuasar()
const router = useRouter()

const formStep3 = ref<QForm | null>(null)

const form = reactive({
  nom: '',
  email: '',
  sujet: '',
  message: ''
})

async function goToProduit() {
  await router.push('/')
}

async function payOrder() {
  const isValid = await formStep3.value?.validate()

  if (!isValid) {
    return
  }

  showNotif()
  await goToProduit()
}

function showNotif() {
  $q.notify({
    type: 'positive',
    message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    color: 'green',
    progress: true,
    timeout: 3000
  })
}

function ifconnected() {
  if (userStore.data.customer) {
    form.nom = userStore.data.customer?.name;
    form.email = userStore.data.customer?.email;
  }
}

onMounted(() => {
  ifconnected()
})
</script>