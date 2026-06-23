<template>
  <!-- #region Register page -->
  <q-page class="q-pa-md">
    <!-- #region Register card -->
    <q-card flat class="q-pa-sm">
      <!-- #region Register form -->
      <q-card-section>
        <q-form ref="formInscription" class="row q-col-gutter-md" @submit.prevent="saveForm">
          <div class="col-12">
            <q-input
              v-model="form.nom"
              outlined
              :label="t('register.form.fullName.label')"
              :placeholder="t('register.form.fullName.placeholder')"
              :rules="nameRules"
              reactive-rules
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="form.email"
              outlined
              type="email"
              :label="t('register.form.email.label')"
              :placeholder="t('register.form.email.placeholder')"
              color="primary"
              bg-color="white"
              :rules="emailRules"
              reactive-rules
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="form.password"
              outlined
              type="password"
              :label="t('register.form.password.label')"
              :placeholder="t('register.form.password.placeholder')"
              :rules="passwordRules"
              reactive-rules
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="form.address"
              outlined
              :label="t('register.form.address.label')"
              :placeholder="t('register.form.address.placeholder')"
              :rules="addressRules"
              reactive-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="form.city"
              outlined
              :label="t('register.form.city.label')"
              :placeholder="t('register.form.city.placeholder')"
              :rules="cityRules"
              reactive-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="form.postalCode"
              outlined
              :label="t('register.form.zipCode.label')"
              :placeholder="t('register.form.zipCode.placeholder')"
              :rules="zipCodeRules"
              reactive-rules
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="form.phone"
              outlined
              type="tel"
              :label="t('register.form.phone.label')"
              :placeholder="t('register.form.phone.placeholder')"
              :rules="phoneRules"
              reactive-rules
            />
          </div>

          <!-- #region Register actions -->
          <div class="col-12 q-mt-sm row q-gutter-sm">
            <q-btn
              unelevated
              color="primary"
              :label="t('register.form.submit')"
              icon-right="send"
              class="full-width"
              size="md"
              type="submit"
            />
          </div>
          <!-- #endregion Register actions -->
        </q-form>
      </q-card-section>
      <!-- #endregion Register form -->
    </q-card>
    <!-- #endregion Register card -->
  </q-page>
  <!-- #endregion Register page -->
</template>

<script setup lang="ts">
//#region Import
import { reactive, ref, onMounted, computed } from 'vue'
import { LocalStorage, QForm, useQuasar } from 'quasar'
import { useRouter }                      from 'vue-router'
import * as bll from '../bll/bll'
import { useI18n } from 'vue-i18n'
//#endregion


//#region Init
const $q              = useQuasar()
const { t }           = useI18n()
const router          = useRouter()
const formInscription = ref<QForm | null>(null)

const form = reactive({
  nom: '',
  email: '',
  password: '',
  address: '',
  city: '',
  postalCode: '',
  phone: ''
})

/**
 * Validate name field
 */
const nameRules = computed(() => [
  (val: string) => !!val || t('register.validation.nameRequired')
])

/**
 * Validate email field
 */
const emailRules = computed(() => [
  (val: string) => !!val || t('register.validation.emailRequired')
])

/**
 * Validate password field
 */
const passwordRules = computed(() => [
  (val: string) => !!val || t('register.validation.passwordRequired'),
  (val: string) => val.length >= 6 || t('register.validation.passwordMin')
])

/**
 * Validate address field
 */
const addressRules = computed(() => [
  (val: string) => !!val || t('register.validation.addressRequired')
])

/**
 * Validate city field
 */
const cityRules = computed(() => [
  (val: string) => !!val || t('register.validation.cityRequired')
])

/**
 * Validate zip code field
 */
const zipCodeRules = computed(() => [
  (val: string) => !!val || t('register.validation.zipRequired'),
  (val: string) => /^\d{5}$/.test(val) || t('register.validation.zipInvalid')
])

/**
 * Validate phone field
 */
const phoneRules = computed(() => [
  (val: string) => !!val || t('register.validation.phoneRequired'),
  (val: string) => val.length >= 10 || t('register.validation.phoneTooShort')
])
//#endregion




//#region Function

/**
 * Go to products page
 */
function goToConnection() {
  void router.push('/connection');
}

/**
 * Validate and save register form
 */
async function saveForm() {
  const isValid = await formInscription.value?.validate()

  if (!isValid) {
    return
  }

  try {
    const newCustomerId = await bll.addCustomer(
      form.nom,
      form.phone,
      form.email,
      form.address,
      form.city,
      form.postalCode,
      form.password
    )

    console.log(newCustomerId)

    LocalStorage.set('form-inscription', form)

    $q.notify({
      type: 'positive',
      message: t('register.notifications.success'),
      color: 'green',
      progress: true,
      timeout: 3000
    })
    goToConnection()
  } catch (e) {
    console.log('oops', e)

    $q.notify({
      type: 'negative',
      message: t('register.notifications.error'),
      timeout: 3000
    })
  }
}
//#endregion

/**
 * Restore saved form on mount
 */
onMounted(() => {
  const savedForm = LocalStorage.getItem('form-inscription')
  if (savedForm) {
    Object.assign(form, savedForm)
  }
})
</script>
