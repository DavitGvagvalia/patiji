import { siteContent } from '../content/site'
import type { Locale, SiteContent } from '../types/i18n'

export const dictionaries: Record<Locale, SiteContent> = {
  en: siteContent,
  ka: {
    ...siteContent,
    nav: {
      home: 'მთავარი',
      catalog: 'კატალოგი',
      profile: 'პროფილი',
    },
    footer:
      'ლუქს კლასის საქორწილო მოსაწვევი ვებსაიტის შაბლონები წყვილებისთვის, რომლებიც აფასებენ სილამაზეს, სიცხადეს და სიმარტივეს.',
    metadata: {
      home: {
        title: 'dapatije | ლუქს კლასის საქორწილო მოსაწვევი ვებსაიტის შაბლონები',
        description:
          'dapatije.ge გთავაზობთ პრემიუმ საქორწილო მოსაწვევი ვებსაიტის შაბლონებს ელეგანტური ციფრული მოწვევისა და RSVP გამოცდილებისთვის.',
        path: '/',
      },
      catalog: {
        title: 'საქორწილო ვებსაიტის შაბლონების კატალოგი | dapatije',
        description:
          'დაათვალიერეთ ელეგანტური საქორწილო ვებსაიტის შაბლონები სტილის, ფერის, განლაგებისა და ენის მხარდაჭერის მიხედვით.',
        path: '/catalog',
      },
      customWebsite: {
        title: 'ინდივიდუალური საქორწილო ვებსაიტის მოთხოვნა | dapatije',
        description:
          'აღწერეთ, როგორი ინდივიდუალური საქორწილო მოსაწვევი ვებსაიტი გჭირდებათ და გაგზავნეთ პირადი მოთხოვნა.',
        path: '/custom-website',
      },
      profile: {
        title: 'მომხმარებლის პროფილი და RSVP პასუხები | dapatije',
        description:
          'ნახეთ შეძენილი საქორწილო მოსაწვევი ვებსაიტი და სტუმრების RSVP პასუხები ერთ სუფთა პროფილის სივრცეში.',
        path: '/profile',
      },
    },
    home: {
      ...siteContent.home,
      eyebrow: 'ციფრული საქორწილო მოსაწვევები',
      headline: 'ლუქს კლასის საქორწილო მოსაწვევი ვებსაიტები განსაკუთრებული დღესასწაულებისთვის.',
      intro:
        'dapatije წყვილებს ეხმარება შექმნან ელეგანტური საქორწილო მოსაწვევი ვებსაიტები RSVP პასუხებით, დახვეწილი განლაგებით და პრემიუმ სტუმრის გამოცდილებით.',
      primaryCta: 'შაბლონების ნახვა',
      secondaryCta: 'პროფილის ნახვა',
      previewLabel: 'რჩეული შაბლონი',
      valueTitle: 'შექმნილია საქორწილო გამოცდილებისთვის და არა ზოგადი ვებსაიტის ასაწყობად.',
      valueCopy:
        'ყოველი შაბლონი მიჰყვება წყვილის რეალურ საჭიროებას: ლამაზი მოსაწვევი, მკაფიო ღონისძიების დეტალები, მარტივი RSVP პასუხები და მოწესრიგებული პროფილი.',
      benefitsTitle: 'დახვეწილი საფუძველი თანამედროვე მოსაწვევებისთვის',
      benefits: [
        {
          title: 'ელეგანტური პირველი შთაბეჭდილება',
          text: 'პრემიუმ ტიპოგრაფია, მოწესრიგებული სივრცეები და საქორწილო განლაგებები მოსაწვევს თავიდანვე გააზრებულ იერს აძლევს.',
        },
        {
          title: 'RSVP-სთვის მზად',
          text: 'პროდუქტის მიმართულება სტუმრების პასუხებს შეძენილ მოსაწვევთან აკავშირებს და შემდეგ ფაზაში Firebase შენახვისთვის ამზადებს.',
        },
        {
          title: 'საერთაშორისო დასაწყისიდან',
          text: 'გვერდის ტექსტები და კატალოგის შინაარსი ცენტრალიზებულია, რათა ქართული, ინგლისური და რუსული კონტენტი მარტივად დაემატოს.',
        },
      ],
      stepsTitle: 'როგორ მუშაობს',
      steps: [
        'აირჩიეთ საქორწილო მოსაწვევი ვებსაიტის შაბლონი.',
        'შეიძინეთ ერთხელ და დააკავშირეთ ანგარიშთან.',
        'გაუზიარეთ მოსაწვევის ბმული სტუმრებს.',
        'ნახეთ RSVP პასუხები პროფილის გვერდზე.',
      ],
    },
    catalog: {
      ...siteContent.catalog,
      eyebrow: 'შაბლონების კატალოგი',
      headline: 'იპოვეთ მოსაწვევის სტილი, რომელიც თქვენს დღესასწაულს შეეფერება.',
      intro:
        'დაათვალიერეთ საქორწილო ვებსაიტის შაბლონები სტილის, ფერის, განლაგებისა და ენის მხარდაჭერის მიხედვით. გადახდა და ცოცხალი preview შემდეგ ფაზებში დაემატება.',
      filterLabel: 'კატალოგის ფილტრები',
      styleLabel: 'სტილი',
      paletteLabel: 'ფერის პალიტრა',
      allStyles: 'ყველა სტილი',
      allPalettes: 'ყველა ფერი',
      previewAction: 'ნახვა',
      selectAction: 'არჩევა',
      checkoutLoadingAction: 'გადახდა მზადდება...',
      checkoutRedirectingMessage: 'უსაფრთხო გადახდაზე გადამისამართება...',
      checkoutNotConfiguredMessage:
        'გადახდა ჯერ არ არის კონფიგურირებული. შეძენების დასასრულებლად საჭიროა სანდო სერვერული endpoint.',
      checkoutErrorMessage:
        'გადახდის დაწყება ვერ მოხერხდა. სცადეთ მოგვიანებით.',
      loadingMessage: 'შაბლონები იტვირთება...',
      fallbackMessage:
        'ცოცხალი კატალოგის მონაცემების მიუწვდომლობისას ნაჩვენებია შერჩეული შაბლონები.',
      noResults: 'ამ ფილტრებით შაბლონები ჯერ არ მოიძებნა.',
      noResultsSuggestion: 'გაასუფთავეთ ფილტრები ყველა ხელმისაწვდომი შაბლონის სანახავად.',
      resetFiltersAction: 'ფილტრების გასუფთავება',
      customWebsite: {
        eyebrow: 'ინდივიდუალური ვებსაიტი',
        title: 'საქორწილო ვებსაიტი, რომელიც თქვენს დღესასწაულზეა მორგებული.',
        description:
          'გაგვიზიარეთ ხედვა, სტუმრების საჭიროებები, ენები, ბიუჯეტი და ვადები. დეტალებს განვიხილავთ და 24 საათში გიპასუხებთ.',
        priceLabel: 'ინდივიდუალური ფასი',
        action: 'კითხვარის დაწყება',
        features: ['მორგებული დიზაინის მიმართულება', 'RSVP და სტუმრების დეტალები', 'მრავალენოვანი გამოცდილება'],
      },
    },
    customWebsite: {
      ...siteContent.customWebsite,
      eyebrow: 'ინდივიდუალური ვებსაიტის მოთხოვნა',
      headline: 'გვითხარით, როგორი უნდა იყოს თქვენი საქორწილო ვებსაიტი.',
      intro:
        'ეს კითხვარი გვეხმარება გავიგოთ თქვენი დღესასწაული, დიზაინის გემოვნება, აუცილებელი სექციები, ბიუჯეტი და გაშვების ვადა.',
      signedOutTitle: 'შედით ანგარიშში ინდივიდუალური ვებსაიტის მოთხოვნისთვის',
      signedOutText:
        'შექმენით ან გამოიყენეთ ანგარიში, რომელსაც ეს მოთხოვნა უნდა დაუკავშირდეს. შესვლის შემდეგ კითხვარი ამავე გვერდზე დარჩება.',
      loadingMessage: 'ანგარიში იტვირთება...',
      errorTitle: 'რაღაც შეცდომა მოხდა',
      stepLabel: 'ნაბიჯი',
      previousAction: 'უკან',
      nextAction: 'გაგრძელება',
      submitAction: 'მოთხოვნის გაგზავნა',
      submittingAction: 'იგზავნება...',
      requiredNote: 'სავალდებულო ველები მონიშნულია ვარსკვლავით.',
      successTitle: 'თქვენი ინდივიდუალური ვებსაიტის მოთხოვნა გაგზავნილია.',
      successText:
        'გმადლობთ. დეტალებს განვიხილავთ და 24 საათში გიპასუხებთ თქვენთვის სასურველი საკონტაქტო გზით.',
      returnCatalogAction: 'კატალოგში დაბრუნება',
      submitErrorMessage: 'მოთხოვნის გაგზავნა ვერ მოხერხდა. გადაამოწმეთ დეტალები და სცადეთ ხელახლა.',
      reviewTitle: 'გადაამოწმეთ მოთხოვნა',
      emptyValue: 'არ არის მითითებული',
      optionalDetailsNote: 'თუ ეს დეტალები ჯერ არ იცით, დატოვეთ ცარიელი და მოგვიანებით დავაზუსტებთ.',
      launchDateOptionalNote: 'თუ თარიღის არჩევისთვის მზად არ ხართ, მიწოდების ვადას მოგვიანებით დავაზუსტებთ.',
      defaultLanguageNote:
        'ინგლისური ნაგულისხმევად შედის. ქართული ან რუსული დაამატეთ მხოლოდ დამატებითი ენობრივი ვერსიებისთვის.',
      contactMethods: [
        { value: 'email', label: 'ელფოსტა' },
        { value: 'phone', label: 'ტელეფონი' },
        { value: 'whatsapp', label: 'WhatsApp' },
      ],
      guestCountRanges: ['50-ზე ნაკლები', '50-100', '100-200', '200+'],
      budgetRanges: ['$500-$1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000+'],
      featureOptions: [
        { value: 'rsvp', label: 'RSVP პასუხების შეგროვება' },
        { value: 'schedule', label: 'ქორწილის განრიგი' },
        { value: 'venue-map', label: 'ლოკაცია და რუკა' },
        { value: 'gallery', label: 'ფოტო გალერეა' },
        { value: 'multilingual', label: 'მრავალენოვანი კონტენტი' },
        { value: 'story', label: 'წყვილის ისტორია' },
        { value: 'registry', label: 'საჩუქრების ან registry დეტალები' },
      ],
      styleOptions: [
        { value: 'classic', label: 'კლასიკური' },
        { value: 'editorial', label: 'ედიტორიალი' },
        { value: 'garden', label: 'ბაღის სტილი' },
        { value: 'minimal', label: 'მინიმალური' },
      ],
      paletteOptions: [
        { value: 'ivory', label: 'აივორი' },
        { value: 'navy', label: 'მუქი ლურჯი' },
        { value: 'gold', label: 'ოქროსფერი' },
        { value: 'sage', label: 'სეიჯი' },
      ],
      languageOptions: [
        { value: 'English', label: 'ინგლისური' },
        { value: 'Georgian', label: 'ქართული' },
        { value: 'Russian', label: 'რუსული' },
      ],
      steps: [
        {
          title: 'კონტაქტი',
          description: 'დაადასტურეთ, ვის დავუკავშირდეთ ინდივიდუალური ვებსაიტის შესახებ.',
          fields: {
            partnerOneName: 'პირველი პარტნიორის სახელი',
            partnerTwoName: 'მეორე პარტნიორის სახელი',
            customerName: 'თქვენი სახელი',
            customerEmail: 'ელფოსტა',
            preferredContactMethod: 'სასურველი საკონტაქტო გზა',
          },
        },
        {
          title: 'ქორწილის ძირითადი დეტალები',
          description: 'გაგვიზიარეთ ის დეტალები, რომლებიც უკვე იცით.',
          fields: {
            coupleNames: 'წყვილის სახელები',
            weddingDate: 'ქორწილის თარიღი',
            location: 'ქალაქი და ქვეყანა',
            guestCountRange: 'სტუმრების სავარაუდო რაოდენობა',
          },
        },
        {
          title: 'ვებსაიტის საჭიროებები',
          description: 'აირჩიეთ სექციები და ფუნქციები, რომლებიც სტუმრებს დასჭირდებათ.',
          fields: {
            requestedFeatures: 'სასურველი ფუნქციები',
          },
        },
        {
          title: 'დიზაინის მიმართულება',
          description: 'აღწერეთ ვიზუალური განწყობა და ენების საჭიროება.',
          fields: {
            stylePreference: 'სტილის გემოვნება',
            palettePreference: 'ფერის პალიტრა',
            languageSupport: 'ვებსაიტის ენები',
            notes: 'ინსპირაცია ან შენიშვნები',
          },
        },
        {
          title: 'ბიუჯეტი და ვადები',
          description: 'დაგვეხმარეთ პროექტის ზომისა და მიწოდების მოლოდინის გაგებაში.',
          fields: {
            budgetRange: 'ბიუჯეტის დიაპაზონი',
            desiredLaunchDate: 'სასურველი გაშვების თარიღი',
          },
        },
      ],
    },
    profile: {
      ...siteContent.profile,
      eyebrow: 'მომხმარებლის პროფილი',
      headline: 'თქვენი მოსაწვევი და სტუმრების პასუხები ერთ მშვიდ სამუშაო სივრცეში.',
      intro:
        'ეს ფაზა აჩვენებს პროფილის დაგეგმილ სტრუქტურას. ავტორიზაცია, Firestore წაკითხვა და დაცული მონაცემები Firebase კონფიგურაციის შემდეგ დაემატება.',
      loadingMessage: 'პროფილი იტვირთება...',
      signedOutTitle: 'შედით ანგარიშში მოსაწვევის პროფილის სანახავად',
      signedOutText:
        'გამოიყენეთ ანგარიში, რომელიც თქვენს შეძენილ საქორწილო მოსაწვევ ვებსაიტს უკავშირდება.',
      emailLabel: 'ელფოსტა',
      passwordLabel: 'პაროლი',
      displayNameLabel: 'სახელი',
      signInAction: 'შესვლა',
      googleSignInAction: 'Google-ით გაგრძელება',
      createAccountAction: 'ანგარიშის შექმნა',
      switchToCreate: 'ახალი ანგარიშის შექმნა',
      switchToSignIn: 'არსებული ანგარიშით შესვლა',
      signOutAction: 'გასვლა',
      errorTitle: 'რაღაც შეცდომა მოხდა',
      noInvitationTitle: 'შეძენილი მოსაწვევი ჯერ არ არის',
      noInvitationText:
        'წარმატებული ერთჯერადი შეძენის შემდეგ თქვენი მოსაწვევი ვებსაიტი და RSVP პასუხები აქ გამოჩნდება.',
      browseCatalogAction: 'შაბლონების ნახვა',
      accountTitle: 'ანგარიში',
      purchaseTitle: 'შეძენილი მოსაწვევი',
      answersTitle: 'სტუმრების პასუხები',
      nameLabel: 'სახელი',
      invitationUrlLabel: 'მოსაწვევის URL',
      templateLabel: 'შაბლონი',
      statusLabel: 'სტატუსი',
      weddingDateLabel: 'ქორწილის თარიღი',
      emptyAnswers: 'პასუხები ჯერ არ არის. სტუმრების RSVP პასუხები აქ გამოჩნდება.',
    },
    invitation: {
      ...siteContent.invitation,
      loadingMessage: 'მოსაწვევი იტვირთება...',
      unavailableTitle: 'მოსაწვევი მიუწვდომელია',
      unavailableText: 'ეს მოსაწვევი შეიძლება იყოს არააქტიური, პირადი ან აღარ იყოს ხელმისაწვდომი.',
      returnHomeAction: 'dapatije-ზე დაბრუნება',
      eyebrow: 'საქორწილო მოსაწვევი',
      defaultHeadline: 'ოჯახებთან ერთად გიწვევთ საზეიმო დღესასწაულზე.',
      rsvpEyebrow: 'RSVP',
      rsvpTitle: 'სტუმრის დეტალები',
      guestNameLabel: 'სრული სახელი',
      attendingLabel: 'დაესწრებით?',
      attendingYes: 'დიახ, დავესწრები',
      attendingNo: 'არა, ვერ დავესწრები',
      partySizeLabel: 'სტუმრების რაოდენობა',
      messageLabel: 'შეტყობინება',
      submitAction: 'RSVP გაგზავნა',
      submittingAction: 'იგზავნება...',
      successMessage: 'გმადლობთ. თქვენი RSVP გაგზავნილია.',
      errorMessage: 'RSVP ვერ გაიგზავნა. სცადეთ ხელახლა.',
      venueLabel: 'ლოკაცია',
      dateLabel: 'თარიღი',
    },
  },
  ru: {
    ...siteContent,
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      profile: 'Профиль',
    },
    footer:
      'Премиальные шаблоны свадебных сайтов-приглашений для пар, которые ценят красоту, ясность и простоту.',
    metadata: {
      home: {
        title: 'dapatije | Премиальные шаблоны свадебных сайтов-приглашений',
        description:
          'dapatije.ge предлагает премиальные шаблоны свадебных сайтов-приглашений для элегантного цифрового приглашения и RSVP.',
        path: '/',
      },
      catalog: {
        title: 'Каталог шаблонов свадебных сайтов | dapatije',
        description:
          'Просматривайте элегантные шаблоны свадебных сайтов по стилю, цветовой палитре, макету и языковой поддержке.',
        path: '/catalog',
      },
      customWebsite: {
        title: 'Заявка на индивидуальный свадебный сайт | dapatije',
        description:
          'Расскажите dapatije, каким должен быть ваш индивидуальный свадебный сайт-приглашение, и отправьте приватную заявку.',
        path: '/custom-website',
      },
      profile: {
        title: 'Профиль клиента и RSVP-ответы | dapatije',
        description:
          'Просматривайте купленный свадебный сайт-приглашение и RSVP-ответы гостей в одном аккуратном профиле.',
        path: '/profile',
      },
    },
    home: {
      ...siteContent.home,
      eyebrow: 'Цифровые свадебные приглашения',
      headline: 'Премиальные свадебные сайты-приглашения для торжеств с характером.',
      intro:
        'dapatije помогает парам запускать элегантные свадебные сайты-приглашения с RSVP, продуманными макетами и премиальным опытом для гостей.',
      primaryCta: 'Смотреть шаблоны',
      secondaryCta: 'Открыть профиль',
      previewLabel: 'Избранный шаблон',
      valueTitle: 'Создано для свадебного опыта, а не для обычного конструктора сайтов.',
      valueCopy:
        'Каждый шаблон построен вокруг реального сценария пары: красивое приглашение, понятные детали события, простые RSVP-ответы и организованный профиль.',
      benefitsTitle: 'Продуманная основа для современных приглашений',
      benefits: [
        {
          title: 'Элегантное первое впечатление',
          text: 'Премиальная типографика, точные отступы и свадебные макеты делают приглашение цельным с первого экрана.',
        },
        {
          title: 'Готово к RSVP',
          text: 'Архитектура продукта связывает ответы гостей с купленным приглашением и готовит хранение в Firebase на следующем этапе.',
        },
        {
          title: 'Международный подход с начала',
          text: 'Тексты страниц и каталог централизованы, чтобы английский, грузинский и русский контент можно было развивать без переписывания компонентов.',
        },
      ],
      stepsTitle: 'Как это работает',
      steps: [
        'Выберите шаблон свадебного сайта-приглашения.',
        'Купите один раз и привяжите к аккаунту.',
        'Поделитесь ссылкой на приглашение с гостями.',
        'Просматривайте RSVP-ответы в профиле.',
      ],
    },
    catalog: {
      ...siteContent.catalog,
      eyebrow: 'Каталог шаблонов',
      headline: 'Найдите стиль приглашения, который подходит вашему торжеству.',
      intro:
        'Просматривайте шаблоны свадебных сайтов по стилю, палитре, макету и языковой поддержке. Оплата и живые превью будут подключены позже.',
      filterLabel: 'Фильтры каталога',
      styleLabel: 'Стиль',
      paletteLabel: 'Цветовая палитра',
      allStyles: 'Все стили',
      allPalettes: 'Все палитры',
      previewAction: 'Просмотр',
      selectAction: 'Выбрать',
      checkoutLoadingAction: 'Подготовка оплаты...',
      checkoutRedirectingMessage: 'Переход к безопасной оплате...',
      checkoutNotConfiguredMessage:
        'Оплата пока не настроена. Для завершения покупок нужен доверенный серверный endpoint.',
      checkoutErrorMessage:
        'Не удалось начать оплату. Попробуйте позже.',
      loadingMessage: 'Загрузка шаблонов...',
      fallbackMessage:
        'Показаны отобранные шаблоны, пока данные live-каталога недоступны.',
      noResults: 'По этим фильтрам шаблонов пока нет.',
      noResultsSuggestion: 'Сбросьте фильтры, чтобы увидеть все доступные шаблоны.',
      resetFiltersAction: 'Сбросить фильтры',
      customWebsite: {
        eyebrow: 'Индивидуальный сайт',
        title: 'Свадебный сайт, созданный под ваше торжество.',
        description:
          'Поделитесь вашим видением, потребностями гостей, языками, бюджетом и сроками. Мы изучим детали и ответим в течение 24 часов.',
        priceLabel: 'Индивидуальная смета',
        action: 'Начать анкету',
        features: ['Индивидуальное направление дизайна', 'RSVP и данные гостей', 'Многоязычный опыт'],
      },
    },
    customWebsite: {
      ...siteContent.customWebsite,
      eyebrow: 'Заявка на индивидуальный сайт',
      headline: 'Расскажите, каким должен стать ваш свадебный сайт.',
      intro:
        'Эта анкета помогает нам понять ваше торжество, дизайн-предпочтения, обязательные разделы, бюджет и желаемые сроки запуска.',
      signedOutTitle: 'Войдите, чтобы запросить индивидуальный сайт',
      signedOutText:
        'Создайте или используйте аккаунт, к которому должна относиться эта заявка. После входа анкета останется на этой странице.',
      loadingMessage: 'Загрузка аккаунта...',
      errorTitle: 'Что-то пошло не так',
      stepLabel: 'Шаг',
      previousAction: 'Назад',
      nextAction: 'Продолжить',
      submitAction: 'Отправить заявку',
      submittingAction: 'Отправка...',
      requiredNote: 'Обязательные поля отмечены звездочкой.',
      successTitle: 'Ваша заявка на индивидуальный сайт отправлена.',
      successText:
        'Спасибо. Мы изучим детали и ответим в течение 24 часов через предпочитаемый вами способ связи.',
      returnCatalogAction: 'Вернуться в каталог',
      submitErrorMessage: 'Не удалось отправить заявку. Проверьте детали и попробуйте снова.',
      reviewTitle: 'Проверьте заявку',
      emptyValue: 'Не указано',
      optionalDetailsNote: 'Если вы пока не знаете эти детали, оставьте поля пустыми, и мы уточним их позже.',
      launchDateOptionalNote: 'Если вы пока не готовы выбрать дату, срок доставки можно уточнить позже.',
      defaultLanguageNote:
        'Английский включен по умолчанию. Добавьте грузинский или русский только для дополнительных языковых версий.',
      contactMethods: [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Телефон' },
        { value: 'whatsapp', label: 'WhatsApp' },
      ],
      guestCountRanges: ['До 50', '50-100', '100-200', '200+'],
      budgetRanges: ['$500-$1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000+'],
      featureOptions: [
        { value: 'rsvp', label: 'Сбор RSVP' },
        { value: 'schedule', label: 'Расписание свадьбы' },
        { value: 'venue-map', label: 'Локация и карта' },
        { value: 'gallery', label: 'Фотогалерея' },
        { value: 'multilingual', label: 'Многоязычный контент' },
        { value: 'story', label: 'История пары' },
        { value: 'registry', label: 'Подарки или registry' },
      ],
      styleOptions: [
        { value: 'classic', label: 'Классический' },
        { value: 'editorial', label: 'Редакционный' },
        { value: 'garden', label: 'Садовый' },
        { value: 'minimal', label: 'Минимальный' },
      ],
      paletteOptions: [
        { value: 'ivory', label: 'Айвори' },
        { value: 'navy', label: 'Темно-синий' },
        { value: 'gold', label: 'Золотой' },
        { value: 'sage', label: 'Шалфейный' },
      ],
      languageOptions: [
        { value: 'English', label: 'Английский' },
        { value: 'Georgian', label: 'Грузинский' },
        { value: 'Russian', label: 'Русский' },
      ],
      steps: [
        {
          title: 'Контакт',
          description: 'Подтвердите, с кем нам связаться по индивидуальному сайту.',
          fields: {
            partnerOneName: 'Имя первого партнера',
            partnerTwoName: 'Имя второго партнера',
            customerName: 'Ваше имя',
            customerEmail: 'Email',
            preferredContactMethod: 'Предпочитаемый способ связи',
          },
        },
        {
          title: 'Основные детали свадьбы',
          description: 'Поделитесь теми деталями торжества, которые уже знаете.',
          fields: {
            coupleNames: 'Имена пары',
            weddingDate: 'Дата свадьбы',
            location: 'Город и страна',
            guestCountRange: 'Примерное количество гостей',
          },
        },
        {
          title: 'Потребности сайта',
          description: 'Выберите разделы и функции, которые понадобятся гостям.',
          fields: {
            requestedFeatures: 'Нужные функции',
          },
        },
        {
          title: 'Направление дизайна',
          description: 'Опишите визуальное настроение и языковые потребности.',
          fields: {
            stylePreference: 'Стиль',
            palettePreference: 'Цветовая палитра',
            languageSupport: 'Языки сайта',
            notes: 'Вдохновение или заметки',
          },
        },
        {
          title: 'Бюджет и сроки',
          description: 'Помогите нам понять размер проекта и ожидания по запуску.',
          fields: {
            budgetRange: 'Диапазон бюджета',
            desiredLaunchDate: 'Желаемая дата запуска',
          },
        },
      ],
    },
    profile: {
      ...siteContent.profile,
      eyebrow: 'Профиль клиента',
      headline: 'Ваше приглашение и ответы гостей в одном спокойном рабочем пространстве.',
      intro:
        'Этот этап показывает будущую структуру профиля. Авторизация, чтение из Firestore и защищенные данные будут добавлены после настройки Firebase.',
      loadingMessage: 'Загрузка профиля...',
      signedOutTitle: 'Войдите, чтобы открыть профиль приглашения',
      signedOutText:
        'Используйте аккаунт, связанный с купленным свадебным сайтом-приглашением.',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      displayNameLabel: 'Имя',
      signInAction: 'Войти',
      googleSignInAction: 'Продолжить с Google',
      createAccountAction: 'Создать аккаунт',
      switchToCreate: 'Создать новый аккаунт',
      switchToSignIn: 'Войти в существующий аккаунт',
      signOutAction: 'Выйти',
      errorTitle: 'Что-то пошло не так',
      noInvitationTitle: 'Купленного приглашения пока нет',
      noInvitationText:
        'После успешной разовой покупки ваш сайт-приглашение и RSVP-ответы появятся здесь.',
      browseCatalogAction: 'Смотреть шаблоны',
      accountTitle: 'Аккаунт',
      purchaseTitle: 'Купленное приглашение',
      answersTitle: 'Ответы гостей',
      nameLabel: 'Имя',
      invitationUrlLabel: 'URL приглашения',
      templateLabel: 'Шаблон',
      statusLabel: 'Статус',
      weddingDateLabel: 'Дата свадьбы',
      emptyAnswers: 'Ответов пока нет. Когда гости отправят RSVP, они появятся здесь.',
    },
    invitation: {
      ...siteContent.invitation,
      loadingMessage: 'Загрузка приглашения...',
      unavailableTitle: 'Приглашение недоступно',
      unavailableText: 'Это приглашение может быть неактивным, приватным или больше недоступным.',
      returnHomeAction: 'Вернуться к dapatije',
      eyebrow: 'Свадебное приглашение',
      defaultHeadline: 'Вместе с семьями они приглашают вас на праздник.',
      rsvpEyebrow: 'RSVP',
      rsvpTitle: 'Данные гостя',
      guestNameLabel: 'Полное имя',
      attendingLabel: 'Вы будете присутствовать?',
      attendingYes: 'Да, я буду',
      attendingNo: 'Нет, не смогу',
      partySizeLabel: 'Количество гостей',
      messageLabel: 'Сообщение',
      submitAction: 'Отправить RSVP',
      submittingAction: 'Отправка...',
      successMessage: 'Спасибо. Ваш RSVP отправлен.',
      errorMessage: 'Не удалось отправить RSVP. Попробуйте еще раз.',
      venueLabel: 'Место',
      dateLabel: 'Дата',
    },
  },
}
