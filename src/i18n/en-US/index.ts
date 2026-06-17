export default {
  menu: {
    debug: {
      getUsers: 'Fetch users',
    },
    product: {
      category: 'Category',
      dimension: 'Dimensions',
      addToCart: 'Add to cart',
      quantity:  'quantity'
    },
    products: {
      1: {
        description:
          'A spacious Scandinavian-style sofa, ideal for a bright and modern living room.',
      },
      2: {
        description: 'An elegant brown-toned sofa designed for comfortable everyday use.',
      },
      3: {
        description:
          'A compact and warm model, perfect for creating a cozy atmosphere in the living room.',
      },
      4: {
        description:
          'A modern and practical sofa with comfortable seating suited for smaller spaces.',
      },
      5: {
        description: 'A sleek and contemporary sofa, easy to fit into an urban decor.',
      },
      6: {
        description:
          'A simple and functional model, ideal for a discreet and efficient relaxation corner.',
      },
      7: {
        description: 'A refined light-colored sofa that brings brightness to the room.',
      },
      8: {
        description:
          'A sofa with a natural and modern style, offering a good balance between comfort and elegance.',
      },
      9: {
        description:
          'A large, chic and welcoming sofa, perfect for spending quality time with family.',
      },
      10: {
        description: 'A premium sofa with a warm style, designed for generous comfort.',
      },
      11: {
        description: 'An elegant and deep sofa, ideal for a modern interior with a bold look.',
      },
      12: {
        description:
          'A premium model, spacious and comfortable, designed to enhance a large living room.',
      },
    },
  },

  notifications: {
    cartCount: 'You have {count} items in your cart',
    goToCart: 'Go to cart',
    continueShopping: 'Continue shopping',
  },

  footer: {
    brandText: '© 2024 SofaLand. Quality and comfort for your home.',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    hoursValue: 'Mon-Fri 9am-6pm',
  },

  layout: {
    header: {
      menuAriaLabel: 'Open menu',
      language: 'Language',
    },
    drawer: {
      title: 'Menu',
      products: 'Products',
      cart: 'Cart',
      customerService: 'Customer service',
      categories: 'Categories',
    },
  },

  auth: {
    register: 'Sign up',
    login: 'Log in',
    logout: 'Log out',
  },

  categories: {
    black: 'Black',
    green: 'Green',
    brown: 'Brown',
    white: 'White',
  },

  contact: {
    title: 'Contact us',
    form: {
      name: {
        label: 'Name',
        placeholder: 'Your full name',
      },
      email: {
        label: 'Email',
        placeholder: "your{'@'}email.com",
      },
      subject: {
        label: 'Subject',
        placeholder: 'How can we help you?',
      },
      message: {
        label: 'Message',
        placeholder: 'Describe your request in detail...',
      },
      submit: 'Send message',
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      subjectRequired: 'Subject is required',
      messageRequired: 'Message is required',
    },
    notifications: {
      success:
        'Your message has been sent successfully! We will get back to you as soon as possible.',
    },
  },

  cart: {
    title: 'Cart',
    quantity: 'Quantity',
    deleteItem: 'Remove item',
    empty: 'No items in the cart.',
    total: 'Total',
    buy: 'Buy',
  },

  checkout: {
    back: 'Back',
    steps: {
      deliveryAddress: 'Delivery address',
      deliveryMode: 'Delivery method',
      payment: 'Payment',
    },
    actions: {
      continue: 'Continue',
      back: 'Back',
      pay: 'Pay',
    },
    form: {
      fullName: {
        label: 'Full name',
        placeholder: 'John Smith',
      },
      email: {
        label: 'Email',
        placeholder: "your{'@'}email.com",
      },
      address: {
        label: 'Address',
        placeholder: '15 Peace Street',
      },
      city: {
        label: 'City',
        placeholder: 'Paris',
      },
      zipCode: {
        label: 'ZIP code',
        placeholder: '75002',
      },
      phone: {
        label: 'Phone',
        placeholder: '+33 6 12 34 56 78',
      },
    },
    delivery: {
      standard: {
        title: 'Standard',
        description: 'Delivery within 3-5 business days',
        price: 'Free',
      },
      express: {
        title: 'Express',
        description: 'Delivery within 24-48 hours',
      },
    },
    payment: {
      cardNumber: {
        label: 'Card number',
        placeholder: '0000 0000 0000 0000',
      },
      expiration: {
        label: 'Expiration date',
        placeholder: 'MM/YY',
      },
      cvv: {
        label: 'CVV',
        hint: 'The 3 digits on the back of your card',
      },
    },
    total: 'Total',
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      addressRequired: 'Address is required',
      cityRequired: 'City is required',
      zipRequired: 'ZIP code is required',
      zipInvalid: 'ZIP code must contain 5 digits',
      phoneRequired: 'Phone number is required',
      phoneTooShort: 'Phone number is too short',
      cardRequired: 'Card number is required',
      cardInvalid: 'Card number must contain 16 digits',
      expirationRequired: 'Expiration date is required',
      expirationInvalid: 'Format must be MM/YY',
      cvvRequired: 'CVV is required',
      cvvInvalid: 'CVV must contain 3 digits',
    },
    notifications: {
      deliveryRequired: 'Please choose a delivery method',
      success: 'Purchase completed successfully!',
    },
  },

  register: {
    form: {
      fullName: {
        label: 'Full name',
        placeholder: 'John Smith',
      },
      email: {
        label: 'Email',
        placeholder: "your{'@'}email.com",
      },
      password: {
        label: 'Password',
        placeholder: '********',
      },
      address: {
        label: 'Address',
        placeholder: '15 Peace Street',
      },
      city: {
        label: 'City',
        placeholder: 'Paris',
      },
      zipCode: {
        label: 'ZIP code',
        placeholder: '75002',
      },
      phone: {
        label: 'Phone',
        placeholder: '+33 6 12 34 56 78',
      },
      submit: 'Sign up',
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must contain at least 6 characters',
      addressRequired: 'Address is required',
      cityRequired: 'City is required',
      zipRequired: 'ZIP code is required',
      zipInvalid: 'ZIP code must contain 5 digits',
      phoneRequired: 'Phone number is required',
      phoneTooShort: 'Phone number is too short',
    },
    notifications: {
      success: 'Registration successful!',
      error: 'An error occurred during registration.',
    },
  },

  login: {
    stepTitle: 'Login',
    form: {
      email: {
        label: 'Email',
        placeholder: "your{'@'}email.com",
      },
      password: {
        label: 'Password',
        placeholder: '********',
      },
      submit: 'Save and continue',
    },
    validation: {
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must contain at least 6 characters',
    },
    notifications: {
      success: 'You are now logged in!',
      error: 'Incorrect username or password',
    },
  },
};
