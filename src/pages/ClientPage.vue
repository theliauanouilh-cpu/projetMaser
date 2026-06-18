<template>
  <!-- #region Page -->
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col">
        <!-- #region Contact section -->
        <section class="bg-blue-grey-1 q-px-md q-py-xl rounded-borders">
          <div class="contact-wrapper">
            <!-- #region Contact title -->
            <div class="text-h6 text-primary text-weight-bold text-center q-mb-lg">
              {{ t('contact.title') }}
            </div>
            <!-- #endregion Contact title -->

            <!-- #region Contact form -->
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
            <!-- #endregion Contact form -->
          </div>
        </section>
        <!-- #endregion Contact section -->

        <!-- #region Footer -->
        <footer class="bg-grey-3 q-px-md q-py-xl q-mt-md rounded-borders">
          <div class="row q-col-gutter-lg items-start">
            <!-- #region Footer brand -->
            <div class="col-12 col-md-6">
              <div class="text-h6 text-primary text-weight-bold">SofaLand</div>
              <div class="text-body2 text-grey-7 q-mt-sm">
                {{ t('footer.brandText') }}
              </div>
            </div>
            <!-- #endregion Footer brand -->

            <!-- #region Footer info -->
            <div class="col-12 col-md-6">
              <div class="column q-gutter-sm">
                <div class="text-body2">
                  {{ t('footer.phone') }} : 01 23 45 67 89
                </div>
                <div class="text-body2">
                  {{ t('footer.email') }} : [support@sofaland.fr](mailto:support@sofaland.fr)
                </div>
                <div class="text-body2">
                  {{ t('footer.hours') }} : {{ t('footer.hoursValue') }}
                </div>
              </div>
            </div>
            <!-- #endregion Footer info -->
          </div>
        </footer>
        <!-- #endregion Footer -->
      </div>
    </div>
  </q-page>
  <!-- #endregion Page -->
</template>

<script setup lang="ts">
//#region Import
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, QForm } from 'quasar'
import { useUserStore } from '../stores/userStore'
import { useI18n } from 'vue-i18n'
//#endregion

//#region Init
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

/**
 * Validate name field
 */
const nameRules = computed(() => [
  (val: string) => !!val || t('contact.validation.nameRequired')
])

/**
 * Validate email field
 */
const emailRules = computed(() => [
  (val: string) => !!val || t('contact.validation.emailRequired')
])

/**
 * Validate subject field
 */
const subjectRules = computed(() => [
  (val: string) => !!val || t('contact.validation.subjectRequired')
])

/**
 * Validate message field
 */
const messageRules = computed(() => [
  (val: string) => !!val || t('contact.validation.messageRequired')
])
//#endregion


//#region Function
/**
 * Go to products page
 */
async function goToproduct() {
  await router.push('/')
}

/**
 * Validate form and submit order
 */
async function payOrder() {
  const isValid = await formStep3.value?.validate()

  if (!isValid) {
    return
  }

  showNotif()
  await goToproduct()
}

/**
 * Show success notification
 */
function showNotif() {
  $q.notify({
    type: 'positive',
    message: t('contact.notifications.success'),
    color: 'green',
    progress: true,
    timeout: 3000
  })
}

/**
 * Fill form if user is connected
 */
function ifconnected() {
  if (userStore.data.customer) {
    form.nom = userStore.data.customer.name
    form.email = userStore.data.customer.email
  }
}
//#endregion

onMounted(() => {
  ifconnected()
})
</script>
