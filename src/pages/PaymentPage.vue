<template>
  <div class="q-pa-md">
    <q-btn color="primary" label="Back" @click="goToProduit" class="q-mb-md" />

    <q-stepper v-model="step" ref="stepper" color="primary" animated flat bordered>
      <!-- Étape 1 -->
      <q-step :name="1" title="Adresse de livraison" icon="local_shipping" :done="step > 1">
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
                  :rules="[(val) => !!val || 'obligatoire']"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.adresse"
                  outlined
                  label="Adresse"
                  placeholder="15 Rue de la Paix"
                  :rules="[(val) => !!val || 'L’adresse est obligatoire']"
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
                    (val) => val.length >= 9 || 'Le téléphone est trop court',
                  ]"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-stepper-navigation>
          <q-btn color="primary" label="Continuer" @click="nextStep1" />
        </q-stepper-navigation>
      </q-step>

      <!-- Étape 2 -->
      <q-step :name="2" title="Mode de livraison" icon="local_shipping" :done="step > 2">
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <div class="column q-gutter-sm">
              <div
                class="row items-center justify-between q-pa-md rounded-borders cursor-pointer"
                :class="delivery === 'standard' ? 'bg-blue-1' : ''"
                :style="{
                  border: '2px solid',
                  borderColor: delivery === 'standard' ? '#1976D2' : '#BDBDBD',
                }"
                @click="delivery = 'standard'"
              >
                <div class="row items-center q-gutter-md">
                  <q-radio v-model="delivery" val="standard" color="primary" />
                  <div>
                    <div class="text-weight-bold text-primary">Standard</div>
                    <div class="text-caption text-grey-7">Livraison sous 3-5 jours ouvrés</div>
                  </div>
                </div>
                <div class="text-weight-bold text-primary">Gratuit</div>
              </div>

              <div
                class="row items-center justify-between q-pa-md rounded-borders cursor-pointer"
                :class="delivery === 'express' ? 'bg-blue-1' : ''"
                :style="{
                  border: '2px solid',
                  borderColor: delivery === 'express' ? '#1976D2' : '#BDBDBD',
                }"
                @click="delivery = 'express'"
              >
                <div class="row items-center q-gutter-md">
                  <q-radio v-model="delivery" val="express" color="primary" />
                  <div>
                    <div class="text-weight-bold">Express</div>
                    <div class="text-caption text-grey-7">Livraison sous 24-48 heures</div>
                  </div>
                </div>
                <div class="text-weight-bold">15,00 €</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-stepper-navigation>
          <q-btn color="primary" label="Continuer" @click="nextStep2" />
          <q-btn flat color="primary" label="Retour" @click="step = 1" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <!-- Étape 3 -->
      <q-step :name="3" title="Paiement" icon="payments">
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <q-form ref="formStep3" class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="payment.cardNumber"
                  outlined
                  label="Numéro de carte"
                  placeholder="0000 0000 0000 0000"
                  mask="#### #### #### ####"
                  :rules="[
                    (val) => !!val || 'Le numéro de carte est obligatoire',
                    (val) =>
                      val.replace(/\s/g, '').length === 16 || 'La carte doit contenir 16 chiffres',
                  ]"
                  lazy-rules
                >
                  <template #prepend>
                    <q-icon name="credit_card" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="payment.expiration"
                  outlined
                  label="Date d'expiration"
                  placeholder="MM/YY"
                  mask="##/##"
                  :rules="[
                    (val) => !!val || 'La date est obligatoire',
                    (val) => val.length === 5 || 'Le format doit être MM/YY',
                  ]"
                  lazy-rules
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="payment.cvv"
                  outlined
                  label="CVV"
                  mask="###"
                  hint="Les 3 chiffres au dos de votre carte"
                  :rules="[
                    (val) => !!val || 'Le CVV est obligatoire',
                    (val) => val.length === 3 || 'Le CVV doit contenir 3 chiffres',
                  ]"
                  lazy-rules
                />
              </div>
            </q-form>

            <div class="q-mt-lg text-h6">Total : {{ total.toFixed(2) }} €</div>
          </q-card-section>
        </q-card>

        <q-stepper-navigation>
          <q-btn color="primary" label="Payer" @click="payOrder" />
          <q-btn flat color="primary" label="Retour" @click="step = 2" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { useQuasar, QForm } from 'quasar';



const $q = useQuasar();
const userStore = useUserStore();
const router = useRouter();

const step = ref(1);

const formStep1 = ref<QForm | null>(null);
const formStep3 = ref<QForm | null>(null);

const form = ref({
  nom: '',
  email: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: '',
});

const delivery = ref('standard');

const payment = ref({
  cardNumber: '',
  expiration: '',
  cvv: '',
});

async function goToProduit() {
  await router.push('/');
}

const total = computed(() => {
  const base = userStore.panierTotal || 0;
  const express = delivery.value === 'express' ? 15 : 0;
  return base + express;
});

async function nextStep1() {
  const isValid = await formStep1.value?.validate();
  if (isValid) {
    step.value = 2;
  }
}

function nextStep2() {
  if (!delivery.value) {
    $q.notify({
      type: 'negative',
      message: 'Veuillez choisir un mode de livraison',
    });
    return;
  }

  step.value = 3;
}

async function payOrder() {
  const isValid = await formStep3.value?.validate();

  if (!isValid) return;

  showNotif();
  clearPanier();
  await goToProduit();
}

function showNotif() {
  $q.notify({
    type: 'positive',
    message: 'Achat bien effectué !!!',
    color: 'green',
    progress: true,
    timeout: 3000,
  });
}

function clearPanier() {
  userStore.clearPanier();
}

function ifconnected() {
  if (userStore.data.customer) {
    form.value.nom = userStore.data.customer?.name;
    form.value.email = userStore.data.customer?.email;
    form.value.adresse = userStore.data.customer?.adresse;
    form.value.ville = userStore.data.customer?.ville;
    form.value.codePostal = userStore.data.customer?.codePostal;
    form.value.telephone = userStore.data.customer?.telephone;
  }
}

onMounted(() => {
  ifconnected()
})
</script>
