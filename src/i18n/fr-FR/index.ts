export default {
  menu: {
    debug: {
      getUsers: 'Récupérer les utilisateurs',
    },
    product: {
      category: 'Catégorie',
      dimension: 'Dimension',
      addToCart: 'Ajouter au panier',
      quantity:  'quantités'
    },
    products: {
      1: {
        description:
          'Canapé spacieux au design scandinave, idéal pour un salon moderne et lumineux.',
      },
      2: {
        description: 'Canapé élégant en ton marron, pensé pour offrir un bon confort au quotidien.',
      },
      3: {
        description:
          'Modèle compact et chaleureux, parfait pour créer une ambiance cosy dans le séjour.',
      },
      4: {
        description:
          'Canapé moderne et pratique, avec une assise confortable adaptée aux petits espaces.',
      },
      5: {
        description: 'Canapé sobre et contemporain, facile à intégrer dans une décoration urbaine.',
      },
      6: {
        description:
          'Modèle simple et fonctionnel, idéal pour un coin détente discret et efficace.',
      },
      7: {
        description: 'Canapé raffiné au coloris clair, apportant de la luminosité à la pièce.',
      },
      8: {
        description:
          'Canapé au style naturel et actuel, offrant un bon équilibre entre confort et élégance.',
      },
      9: {
        description:
          'Grand canapé chic et accueillant, parfait pour les moments conviviaux en famille.',
      },
      10: {
        description: 'Canapé haut de gamme au style chaleureux, conçu pour un confort généreux.',
      },
      11: {
        description: 'Canapé élégant et profond, idéal pour un intérieur moderne au look affirmé.',
      },
      12: {
        description: 'Modèle premium, spacieux et confortable, pensé pour habiller un grand salon.',
      },
    },
  },

  notifications: {
    cartCount: 'Vous avez {count} articles dans le panier',
    goToCart: 'Aller au panier',
    continueShopping: 'Continuer mes achats',
  },

  footer: {
    brandText: '© 2024 SofaLand. Qualité et confort pour votre maison.',
    phone: 'Téléphone',
    email: 'Email',
    hours: 'Horaires',
    hoursValue: 'Lun-Ven 9h-18h',
  },

  layout: {
    header: {
      menuAriaLabel: 'Ouvrir le menu',
      language: 'Langue',
    },
    drawer: {
      title: 'Menu',
      products: 'Produits',
      cart: 'Panier',
      customerService: 'Service client',
      categorys: 'Catégories',
    },
  },

  auth: {
    register: "S'inscrire",
    login: 'Se connecter',
    logout: 'Se déconnecter',
  },

  categorys: {
    black: 'Noir',
    green: 'Vert',
    brown: 'Marron',
    white: 'Blanc',
  },

  contact: {
    title: 'Contactez-nous',
    form: {
      name: {
        label: 'Nom',
        placeholder: 'Votre nom complet',
      },
      email: {
        label: 'Email',
        placeholder: "votre{'@'}email.fr",
      },
      subject: {
        label: 'Sujet',
        placeholder: 'Comment pouvons-nous vous aider ?',
      },
      message: {
        label: 'Message',
        placeholder: 'Décrivez votre demande en détail...',
      },
      submit: 'Envoyer le message',
    },
    validation: {
      nameRequired: 'Le nom est obligatoire',
      emailRequired: 'Email obligatoire',
      subjectRequired: 'Le sujet est obligatoire',
      messageRequired: 'Le message est obligatoire',
    },
    notifications: {
      success:
        'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    },
  },

  cart: {
    title: 'Panier',
    quantity: 'Quantité',
    deleteItem: "Supprimer l'article",
    empty: 'Aucun article dans le panier.',
    total: 'Total',
    buy: 'Acheter',
  },

  checkout: {
    back: 'Retour',
    steps: {
      deliveryAddress: 'Adresse de livraison',
      deliveryMode: 'Mode de livraison',
      payment: 'Paiement',
    },
    actions: {
      continue: 'Continuer',
      back: 'Retour',
      pay: 'Payer',
    },
    form: {
      fullName: {
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
      },
      email: {
        label: 'Email',
        placeholder: "votre{'@'}email.fr",
      },
      address: {
        label: 'Adresse',
        placeholder: '15 Rue de la Paix',
      },
      city: {
        label: 'Ville',
        placeholder: 'Paris',
      },
      zipCode: {
        label: 'Code postal',
        placeholder: '75002',
      },
      phone: {
        label: 'Téléphone',
        placeholder: '+33 6 12 34 56 78',
      },
    },
    delivery: {
      standard: {
        title: 'Standard',
        description: 'Livraison sous 3-5 jours ouvrés',
        price: 'Gratuit',
      },
      express: {
        title: 'Express',
        description: 'Livraison sous 24-48 heures',
      },
    },
    payment: {
      cardNumber: {
        label: 'Numéro de carte',
        placeholder: '0000 0000 0000 0000',
      },
      expiration: {
        label: "Date d'expiration",
        placeholder: 'MM/YY',
      },
      cvv: {
        label: 'CVV',
        hint: 'Les 3 chiffres au dos de votre carte',
      },
    },
    total: 'Total',
    validation: {
      nameRequired: 'Le nom est obligatoire',
      emailRequired: 'Email obligatoire',
      addressRequired: 'L’adresse est obligatoire',
      cityRequired: 'La ville est obligatoire',
      zipRequired: 'Le code postal est obligatoire',
      zipInvalid: 'Le code postal doit contenir 5 chiffres',
      phoneRequired: 'Le téléphone est obligatoire',
      phoneTooShort: 'Le téléphone est trop court',
      cardRequired: 'Le numéro de carte est obligatoire',
      cardInvalid: 'La carte doit contenir 16 chiffres',
      expirationRequired: 'La date est obligatoire',
      expirationInvalid: 'Le format doit être MM/YY',
      cvvRequired: 'Le CVV est obligatoire',
      cvvInvalid: 'Le CVV doit contenir 3 chiffres',
    },
    notifications: {
      deliveryRequired: 'Veuillez choisir un mode de livraison',
      success: 'Achat bien effectué !!!',
    },
  },

  register: {
    form: {
      fullName: {
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
      },
      email: {
        label: 'Email',
        placeholder: "votre{'@'}email.fr",
      },
      password: {
        label: 'Mot de passe',
        placeholder: '********',
      },
      address: {
        label: 'Adresse',
        placeholder: '15 Rue de la Paix',
      },
      city: {
        label: 'Ville',
        placeholder: 'Paris',
      },
      zipCode: {
        label: 'Code postal',
        placeholder: '75002',
      },
      phone: {
        label: 'Téléphone',
        placeholder: '+33 6 12 34 56 78',
      },
      submit: "S'inscrire",
    },
    validation: {
      nameRequired: 'Le nom est obligatoire',
      emailRequired: "L'email est obligatoire",
      passwordRequired: 'Le mot de passe est obligatoire',
      passwordMin: 'Le mot de passe doit contenir au moins 6 caractères',
      addressRequired: "L'adresse est obligatoire",
      cityRequired: 'La ville est obligatoire',
      zipRequired: 'Le code postal est obligatoire',
      zipInvalid: 'Le code postal doit contenir 5 chiffres',
      phoneRequired: 'Le téléphone est obligatoire',
      phoneTooShort: 'Le téléphone est trop court',
    },
    notifications: {
      success: 'Inscription réussie !',
      error: "Une erreur est survenue lors de l'inscription.",
    },
  },

  login: {
    stepTitle: 'Connexion',
    form: {
      email: {
        label: 'Email',
        placeholder: "votre{'@'}email.fr",
      },
      password: {
        label: 'Mot de passe',
        placeholder: '********',
      },
      submit: 'Enregistrer et continuer',
    },
    validation: {
      emailRequired: "L'email est obligatoire",
      passwordRequired: 'Le mot de passe est obligatoire',
      passwordMin: 'Le mot de passe doit contenir au moins 6 caractères',
    },
    notifications: {
      success: 'Vous êtes bien connecté !!!',
      error: 'Identifiant ou mot de passe incorrect',
    },
  },
};
