<template>
  <q-page class="q-pa-md">
    <q-card flat class="q-pa-sm">
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
              v-model="form.adresse"
              outlined
              :label="t('register.form.address.label')"
              :placeholder="t('register.form.address.placeholder')"
              :rules="addressRules"
              reactive-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="form.ville"
              outlined
              :label="t('register.form.city.label')"
              :placeholder="t('register.form.city.placeholder')"
              :rules="cityRules"
              reactive-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="form.codePostal"
              outlined
              :label="t('register.form.zipCode.label')"
              :placeholder="t('register.form.zipCode.placeholder')"
              :rules="zipCodeRules"
              reactive-rules
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="form.telephone"
              outlined
              type="tel"
              :label="t('register.form.phone.label')"
              :placeholder="t('register.form.phone.placeholder')"
              :rules="phoneRules"
              reactive-rules
            />
          </div>

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
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { LocalStorage, QForm, useQuasar } from 'quasar'
import * as bll from '../bll/bll'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const { t } = useI18n()

const formInscription = ref<QForm | null>(null)

const form = reactive({
  nom: '',
  email: '',
  password: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: ''
})

const nameRules = computed(() => [
  (val: string) => !!val || t('register.validation.nameRequired')
])

const emailRules = computed(() => [
  (val: string) => !!val || t('register.validation.emailRequired')
])

const passwordRules = computed(() => [
  (val: string) => !!val || t('register.validation.passwordRequired'),
  (val: string) => val.length >= 6 || t('register.validation.passwordMin')
])

const addressRules = computed(() => [
  (val: string) => !!val || t('register.validation.addressRequired')
])

const cityRules = computed(() => [
  (val: string) => !!val || t('register.validation.cityRequired')
])

const zipCodeRules = computed(() => [
  (val: string) => !!val || t('register.validation.zipRequired'),
  (val: string) => /^\d{5}$/.test(val) || t('register.validation.zipInvalid')
])

const phoneRules = computed(() => [
  (val: string) => !!val || t('register.validation.phoneRequired'),
  (val: string) => val.length >= 10 || t('register.validation.phoneTooShort')
])

onMounted(() => {
  const savedForm = LocalStorage.getItem('form-inscription')
  if (savedForm) {
    Object.assign(form, savedForm)
  }
})

async function saveForm() {
  const isValid = await formInscription.value?.validate()

  if (!isValid) {
    return
  }

  try {
    const newCustomerId = await bll.addCustomer(
      form.nom,
      form.telephone,
      form.email,
      form.adresse,
      form.ville,
      form.codePostal,
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
  } catch (e) {
    console.log('oops', e)

    $q.notify({
      type: 'negative',
      message: t('register.notifications.error'),
      timeout: 3000
    })
  }
}
</script>
