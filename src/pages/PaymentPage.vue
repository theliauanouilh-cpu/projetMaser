<template>
  <!-- #region Checkout -->
  <div class="q-pa-md">
    <!-- #region Back button -->
    <q-btn
      color="primary"
      :label="t('checkout.back')"
      @click="goToProduit"
      class="q-mb-md"
    />
    <!-- #endregion Back button -->

    <!-- #region Stepper -->
    <q-stepper v-model="step" ref="stepper" color="primary" animated flat bordered>
      <!-- #region Step 1 -->
      <q-step
        :name="1"
        :title="t('checkout.steps.deliveryAddress')"
        icon="local_shipping"
        :done="step > 1"
      >
        <q-card flat class="q-pa-sm">
          <!-- #region Delivery form -->
          <q-card-section>
            <q-form ref="formStep1" class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="form.nom"
                  outlined
                  :label="t('checkout.form.fullName.label')"
                  :placeholder="t('checkout.form.fullName.placeholder')"
                  :rules="nameRules"
                  reactive-rules
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.email"
                  outlined
                  type="email"
                  :label="t('checkout.form.email.label')"
                  :placeholder="t('checkout.form.email.placeholder')"
                  color="primary"
                  bg-color="white"
                  :rules="emailRules"
                  reactive-rules
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.adresse"
                  outlined
                  :label="t('checkout.form.address.label')"
                  :placeholder="t('checkout.form.address.placeholder')"
                  :rules="addressRules"
                  reactive-rules
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.ville"
                  outlined
                  :label="t('checkout.form.city.label')"
                  :placeholder="t('checkout.form.city.placeholder')"
                  :rules="cityRules"
                  reactive-rules
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.codePostal"
                  outlined
                  :label="t('checkout.form.zipCode.label')"
                  :placeholder="t('checkout.form.zipCode.placeholder')"
                  :rules="zipCodeRules"
                  reactive-rules
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.telephone"
                  outlined
                  type="tel"
                  :label="t('checkout.form.phone.label')"
                  :placeholder="t('checkout.form.phone.placeholder')"
                  :rules="phoneRules"
                  reactive-rules
                />
              </div>
            </q-form>
          </q-card-section>
          <!-- #endregion Delivery form -->
        </q-card>

        <!-- #region Step 1 actions -->
        <q-stepper-navigation>
          <q-btn
            color="primary"
            :label="t('checkout.actions.continue')"
            @click="nextStep1"
          />
        </q-stepper-navigation>
        <!-- #endregion Step 1 actions -->
      </q-step>
      <!-- #endregion Step 1 -->

      <!-- #region Step 2 -->
      <q-step
        :name="2"
        :title="t('checkout.steps.deliveryMode')"
        icon="local_shipping"
        :done="step > 2"
      >
        <q-card flat class="q-pa-sm">
          <!-- #region Delivery mode -->
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
                    <div class="text-weight-bold text-primary">
                      {{ t('checkout.delivery.standard.title') }}
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ t('checkout.delivery.standard.description') }}
                    </div>
                  </div>
                </div>
                <div class="text-weight-bold text-primary">
                  {{ t('checkout.delivery.standard.price') }}
                </div>
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
                    <div class="text-weight-bold">
                      {{ t('checkout.delivery.express.title') }}
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ t('checkout.delivery.express.description') }}
                    </div>
                  </div>
                </div>
                <div class="text-weight-bold">
                  {{ formatPrice(15) }}
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- #endregion Delivery mode -->
        </q-card>

        <!-- #region Step 2 actions -->
        <q-stepper-navigation>
          <q-btn
            color="primary"
            :label="t('checkout.actions.continue')"
            @click="nextStep2"
          />
          <q-btn
            flat
            color="primary"
            :label="t('checkout.actions.back')"
            @click="step = 1"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
        <!-- #endregion Step 2 actions -->
      </q-step>
      <!-- #endregion Step 2 -->

      <!-- #region Step 3 -->
      <q-step
        :name="3"
        :title="t('checkout.steps.payment')"
        icon="payments"
      >
        <q-card flat class="q-pa-sm">
          <!-- #region Payment form -->
          <q-card-section>
            <q-form ref="formStep3" class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="payment.cardNumber"
                  outlined
                  :label="t('checkout.payment.cardNumber.label')"
                  :placeholder="t('checkout.payment.cardNumber.placeholder')"
                  mask="#### #### #### ####"
                  :rules="cardNumberRules"
                  reactive-rules
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
                  :label="t('checkout.payment.expiration.label')"
                  :placeholder="t('checkout.payment.expiration.placeholder')"
                  mask="##/##"
                  :rules="expirationRules"
                  reactive-rules
                  lazy-rules
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="payment.cvv"
                  outlined
                  :label="t('checkout.payment.cvv.label')"
                  mask="###"
                  :hint="t('checkout.payment.cvv.hint')"
                  :rules="cvvRules"
                  reactive-rules
                  lazy-rules
                />
              </div>
            </q-form>

            <!-- #region Total -->
            <div class="q-mt-lg text-h6">
              {{ t('checkout.total') }} : {{ formatPrice(total) }}
            </div>
            <!-- #endregion Total -->
          </q-card-section>
          <!-- #endregion Payment form -->
        </q-card>

        <!-- #region Step 3 actions -->
        <q-stepper-navigation>
          <q-btn
            color="primary"
            :label="t('checkout.actions.pay')"
            @click="payOrder"
          />
          <q-btn
            flat
            color="primary"
            :label="t('checkout.actions.back')"
            @click="step = 2"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
        <!-- #endregion Step 3 actions -->
      </q-step>
      <!-- #endregion Step 3 -->
    </q-stepper>
    <!-- #endregion Stepper -->
  </div>
  <!-- #endregion Checkout -->
</template>

<script setup lang="ts">
//#region Import
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { useQuasar, QForm } from 'quasar'
import { useI18n } from 'vue-i18n'
//#endregion


//#region Init
const $q = useQuasar()
const userStore = useUserStore()
const router = useRouter()
const { t, n } = useI18n()

const step = ref(1)
const formStep1 = ref<QForm | null>(null)
const formStep3 = ref<QForm | null>(null)

const form = ref({
  nom: '',
  email: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: '',
})

const delivery = ref('standard')

const payment = ref({
  cardNumber: '',
  expiration: '',
  cvv: '',
})

/**
 * Calculate order total
 */
const total = computed(() => {
  const base = userStore.panierTotal || 0
  const express = delivery.value === 'express' ? 15 : 0
  return base + express
})

/**
 * Validate name field
 */
const nameRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.nameRequired')
])

/**
 * Validate email field
 */
const emailRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.emailRequired')
])

/**
 * Validate address field
 */
const addressRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.addressRequired')
])

/**
 * Validate city field
 */
const cityRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.cityRequired')
])

/**
 * Validate zip code field
 */
const zipCodeRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.zipRequired'),
  (val: string) => /^\d{5}$/.test(val) || t('checkout.validation.zipInvalid')
])

/**
 * Validate phone field
 */
const phoneRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.phoneRequired'),
  (val: string) => val.length >= 9 || t('checkout.validation.phoneTooShort')
])

/**
 * Validate card number field
 */
const cardNumberRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.cardRequired'),
  (val: string) => val.replace(/\s/g, '').length === 16 || t('checkout.validation.cardInvalid')
])

/**
 * Validate expiration field
 */
const expirationRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.expirationRequired'),
  (val: string) => val.length === 5 || t('checkout.validation.expirationInvalid')
])

/**
 * Validate CVV field
 */
const cvvRules = computed(() => [
  (val: string) => !!val || t('checkout.validation.cvvRequired'),
  (val: string) => val.length === 3 || t('checkout.validation.cvvInvalid')
])
//#endregion


//#region Function
/**
 * Go to products page
 */
async function goToProduit() {
  await router.push('/')
}

/**
 * Validate first checkout step
 */
async function nextStep1() {
  const isValid = await formStep1.value?.validate()
  if (isValid) {
    step.value = 2
  }
}

/**
 * Validate delivery mode step
 */
function nextStep2() {
  if (!delivery.value) {
    $q.notify({
      type: 'negative',
      message: t('checkout.notifications.deliveryRequired'),
    })
    return
  }

  step.value = 3
}

/**
 * Validate payment and place order
 */
async function payOrder() {
  const isValid = await formStep3.value?.validate()
  if (!isValid) return

  showNotif()
  clearPanier()
  await goToProduit()
}

/**
 * Show success notification
 */
function showNotif() {
  $q.notify({
    type: 'positive',
    message: t('checkout.notifications.success'),
    color: 'green',
    progress: true,
    timeout: 3000,
  })
}

/**
 * Clear cart
 */
function clearPanier() {
  userStore.clearPanier()
}

/**
 * Fill form if user is connected
 */
function ifconnected() {
  if (userStore.data.customer) {
    form.value.nom = userStore.data.customer.name
    form.value.email = userStore.data.customer.email
    form.value.adresse = userStore.data.customer.adresse
    form.value.ville = userStore.data.customer.ville
    form.value.codePostal = userStore.data.customer.codePostal
    form.value.telephone = userStore.data.customer.telephone
  }
}

/**
 * Format price in euro
 */
function formatPrice(value: number): string {
  try {
    return n(value, {
      style: 'currency',
      currency: 'EUR'
    })
  } catch {
    return `${value.toFixed(2)} €`
  }
}
//#endregion

/**
 * Fill form on component mount
 */
onMounted(() => {
  ifconnected()
})
</script>
