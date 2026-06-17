<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col">
        <section class="bg-blue-grey-1 q-px-md q-py-xl rounded-borders">
          <div class="contact-wrapper">
            <div class="text-h6 text-primary text-weight-bold text-center q-mb-lg">
              {{ t('contact.title') }}
            </div>

            <q-form ref="formStep3" class="q-gutter-md" @submit.prevent="payOrder">
              <q-input
                v-model="form.nom"
                outlined
                :label="t('contact.form.name.label')"
                :placeholder="t('contact.form.name.placeholder')"
                color="primary"
                bg-color="white"
                :rules="nameRules"
                reactive-rules
              />

              <q-input
                v-model="form.email"
                outlined
                type="email"
                :label="t('contact.form.email.label')"
                :placeholder="t('contact.form.email.placeholder')"
                color="primary"
                bg-color="white"
                :rules="emailRules"
                reactive-rules
              />

              <q-input
                v-model="form.sujet"
                outlined
                :label="t('contact.form.subject.label')"
                :placeholder="t('contact.form.subject.placeholder')"
                color="primary"
                bg-color="white"
                :rules="subjectRules"
                reactive-rules
              />

              <q-input
                v-model="form.message"
                outlined
                type="textarea"
                autogrow
                :label="t('contact.form.message.label')"
                :placeholder="t('contact.form.message.placeholder')"
                color="primary"
                bg-color="white"
                :rules="messageRules"
                reactive-rules
              />

              <q-btn
                unelevated
                color="primary"
                :label="t('contact.form.submit')"
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
                {{ t('footer.brandText') }}
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="column q-gutter-sm">
                <div class="text-body2">
                  {{ t('footer.phone') }} : 01 23 45 67 89
                </div>
                <div class="text-body2">
                  {{ t('footer.email') }} : support@sofaland.fr
                </div>
                <div class="text-body2">
                  {{ t('footer.hours') }} : {{ t('footer.hoursValue') }}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, QForm } from 'quasar'
import { useUserStore } from '../stores/userStore'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()

const formStep3 = ref<QForm | null>(null)

const form = reactive({
  nom: '',
  email: '',
  sujet: '',
  message: ''
})

const nameRules = computed(() => [
  (val: string) => !!val || t('contact.validation.nameRequired')
])

const emailRules = computed(() => [
  (val: string) => !!val || t('contact.validation.emailRequired')
])

const subjectRules = computed(() => [
  (val: string) => !!val || t('contact.validation.subjectRequired')
])

const messageRules = computed(() => [
  (val: string) => !!val || t('contact.validation.messageRequired')
])

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
    message: t('contact.notifications.success'),
    color: 'green',
    progress: true,
    timeout: 3000
  })
}

function ifconnected() {
  if (userStore.data.customer) {
    form.nom = userStore.data.customer.name
    form.email = userStore.data.customer.email
  }
}

onMounted(() => {
  ifconnected()
})
</script>
