<template>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        :title="t('login.stepTitle')"
        icon="login"
        :done="step > 1"
      >
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <q-form ref="formStep1" class="row q-col-gutter-md" @submit.prevent="authentication">
              <div class="col-12">
                <q-input
                  v-model="form.email"
                  outlined
                  type="email"
                  :label="t('login.form.email.label')"
                  :placeholder="t('login.form.email.placeholder')"
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
                  :label="t('login.form.password.label')"
                  :placeholder="t('login.form.password.placeholder')"
                  :rules="passwordRules"
                  reactive-rules
                />
              </div>

              <div class="col-12 q-mt-sm row q-gutter-sm">
                <q-btn
                  type="submit"
                  :label="t('login.form.submit')"
                  color="primary"
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
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { useQuasar, QForm } from 'quasar'
import * as bll from '../bll/bll'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const step = ref(1)
const formStep1 = ref<QForm | null>(null)

const form = reactive({
  email: '',
  password: '',
})

const emailRules = computed(() => [
  (val: string) => !!val || t('login.validation.emailRequired')
])

const passwordRules = computed(() => [
  (val: string) => !!val || t('login.validation.passwordRequired'),
  (val: string) => val.length >= 6 || t('login.validation.passwordMin')
])

function resetForm() {
  form.email = ''
  form.password = ''
  formStep1.value?.resetValidation()
}

async function goToProduit() {
  await router.push('/')
}

async function authentication() {
  const isValid = await formStep1.value?.validate()

  if (!isValid) {
    return
  }

  const users = await bll.getUsers()
  const customer = users.find(
    (u) => u.email === form.email && u.password === form.password
  )

  if (customer) {
    userStore.data.customer = {
      id: 0,
      name: customer.name,
      email: customer.email,
      adresse: customer.adresse,
      ville: customer.ville,
      codePostal: customer.codePostal,
      telephone: customer.telephone,
      password: customer.password,
    }

    $q.notify({
      type: 'positive',
      message: t('login.notifications.success'),
      color: 'green',
      progress: true,
      timeout: 3000,
    })

    await goToProduit()
  } else {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: t('login.notifications.error'),
      color: 'red',
      progress: true,
      timeout: 3000,
    })

    resetForm()
  }
}
</script>
