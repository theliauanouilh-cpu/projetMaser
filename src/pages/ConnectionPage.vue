<template>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>

      <q-step :name="1" title="Connexion" icon="local_shipping" :done="step > 1">
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <q-form ref="formStep1" class="row q-col-gutter-md">

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

              <div class="col-12 q-mt-sm row q-gutter-sm">
                <q-btn
                  label="Enregistrer et continuer"
                  color="primary"
                  @click="authentication()"
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
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
// import customerList from '../../data/customers.json'
import { useQuasar, QForm } from 'quasar';
import * as bll from '../bll/bll';

const $q = useQuasar();
const router = useRouter();
// const customers = ref(customerList)
const userStore = useUserStore()
const step = ref(1)
const formStep1 = ref<QForm | null>(null)

const form = reactive({
  email: '',
  password: '',
});

function resetForm() {
  form.email = '';
  form.password = '';
  formStep1.value?.resetValidation();
}

async function goToProduit() {
  await router.push('/');
}


async function authentication() {
  const users = await bll.getUsers();
  const customer = users.find((u) => u.email === form.email && u.password === form.password);

  console.log(customer);

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
    };
    $q.notify({
      type: 'positive',
      message: 'Vous êtes bien connecté !!!',
      color: 'green',
      progress: true,
      timeout: 3000,
    });
    await goToProduit();
  }
  else {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Identifiant ou mot de passe incorrect',
      color: 'red',
      progress: true,
      timeout: 3000,
    });

    resetForm();
  }
}






// onMounted(() => {
//   if (userStore.data.customer)
//     alert('connected')
// })


</script>