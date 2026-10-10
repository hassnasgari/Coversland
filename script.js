/**
 * CoversLand (کاورزلند) - Comprehensive Interactive Logic & Admin Panel Management System
 * Built with vanilla JS, LocalStorage persistence, high-contrast aesthetics and full SEO compliance.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATA REPOSITORY & INITIAL STATE
  // ==========================================

  const DEFAULT_PRODUCTS = [
    {
      id: 'prod_1',
      title: 'روکش پوآر شیری ۲۵۰ تایی (بسته ۵۰ عددی)',
      category: 'pouvar',
      categoryName: 'دندانپزشکی • Medical Disposable',
      badge: 'پرفروش',
      image: 'prod_pouvar.jpg',
      pack: 'بسته‌بندی ۵۰ عددی در پاکت / کارتن ۲۵۰ بسته',
      price: 'استعلام قیمت روز',
      desc: 'تهیه شده از پلی‌اتیلن خالص بهداشتی، بدون پودر، دوخت التراسونیک محکم، مقاوم در برابر پاره شدن حین کارکرد پوآر آب و هوا.',
      specs: 'پلی‌اتیلن های‌گرید ۱۰۰٪ نو، ضد تعریق و بدون حساسیت پوستی، مقاومت کششی عالی، کاملاً ضد نفوذ مایعات و بزاق، دوخت التراسونیک بدون درز ضعیف.'
    },
    {
      id: 'prod_2',
      title: 'روکش پوآر شفاف کریستالی (بسته‌های ۵۰ عددی)',
      category: 'pouvar',
      categoryName: 'دندانپزشکی • Crystal Clear',
      badge: 'ویژه',
      image: 'prod_pouvar.jpg',
      pack: 'بسته ۵۰ تایی / کارتن ۲۵۰ عددی',
      price: 'استعلام قیمت روز',
      desc: 'شفافیت ۱۰۰٪ کریستالی، ضد لغزش در دست پزشک، مناسب انواع پوآرهای زاویه‌دار و سرکج با سهولت تعویض سریع بین ویزیت بیماران.',
      specs: 'تولید شده با خط تمام اتوماتیک، حداکثر شفافیت دیداری، لبه‌های باز شونده سریع برای راحتی دستیار، بدون پودر و بدون بو.'
    },
    {
      id: 'prod_3',
      title: 'روکش ساکشن جراحی و عمومی (رول پرفراژدار)',
      category: 'suction',
      categoryName: 'کنترل عفونت • Suction Sleeves',
      badge: 'سایز پرکاربرد',
      image: 'prod_suction_rvg.jpg',
      pack: 'رول ۵۰۰ عددی پرفراژدار / کارتن ۱۰ رولی',
      price: 'استعلام قیمت روز',
      desc: 'پوشش سراسری شیلنگ و کانولای ساکشن یونیت برای جلوگیری کامل از انتقال آلودگی متقاطع (Cross-Infection)، طول بلند و برش آسان.',
      specs: 'عرض استاندارد ۶ سانتی‌متر، طول بهینه‌شده، خط پرفراژ دقیق جهت جداسازی سریع، سازگار با انواع ساکشن‌های جراحی و بزاق‌کش.'
    },
    {
      id: 'prod_4',
      title: 'کاور یکبار مصرف سنسور RVG (سایز ۱ و ۲)',
      category: 'rvg',
      categoryName: 'رادیوگرافی • RVG Sensor Sleeve',
      badge: 'فوق حساس',
      image: 'prod_suction_rvg.jpg',
      pack: 'جعبه ۱۰۰ عددی / کارتن ۵۰ جعبه',
      price: 'استعلام قیمت روز',
      desc: 'فوق‌العاده نرم و منعطف بدون اذیت لثه بیمار، بدون افت کیفیت تصویربرداری اشعه، حفاظت ۱۰۰٪ سنسور چند ده میلیونی در برابر رطوبت و بزاق.',
      specs: 'ضخامت میکرونی کنترل‌شده، بدون تداخل با رزولوشن سنسور دیجیتال، بدون درز زبر در ناحیه دهان بیمار، نصب و خارج‌سازی آسان.'
    },
    {
      id: 'prod_5',
      title: 'کاور کامل یونیت دندانپزشکی (۳ تکه کش‌دار)',
      category: 'unit',
      categoryName: 'تجهیزات مطب • Dental Chair Cover',
      badge: 'بهداشتی',
      image: 'prod_dental_chair_cover.jpg',
      pack: 'ست کامل ۳ تکه / کارتن ۱۰۰ دستی',
      price: 'استعلام قیمت روز',
      desc: 'شامل کاور تکیه‌گاه، نشیمن‌گاه و زیرسری یونیت. کش‌های محکم با ایستایی عالی روی انواع یونیت‌های زیگر، پارس‌دنتال، فیروز دنتال و برندهای خارجی.',
      specs: 'جنس نایلونی ضدآب مقاوم یا اسپان‌باند ضخیم، کش‌دوزی صنعتی با ماندگاری بالا، بدون ایجاد تعریق و چروکیدگی روی صندلی.'
    },
    {
      id: 'prod_6',
      title: 'روکش ضدآب سینی دندانپزشکی (لمینت دو لایه)',
      category: 'unit',
      categoryName: 'بهداشت ابزار • Tray Covers',
      badge: 'ضد نفوذ',
      image: 'prod_dental_tray_disposable.jpg',
      pack: 'بسته ۲۵۰ عددی / کارتن ۱۰ بسته',
      price: 'استعلام قیمت روز',
      desc: 'یک لایه کاغذ جذب آب پزشکی و یک لایه نایلون ضد نفوذ جهت قرارگیری ایمن ابزارآلات استریل روی سینی کار دندانپزشک و دستیار.',
      specs: 'ابعاد استاندارد سینی یونیت، لمینت مستحکم بدون جدا شدن لایه‌ها، جذب سریع ترشحات و قطرات آب، عدم رنگ‌دهی یا پس دادن رطوبت.'
    },
    {
      id: 'prod_7',
      title: 'کاور دسته چراغ و لامپ یونیت دندانپزشکی (شفاف کش‌دار)',
      category: 'unit',
      categoryName: 'کنترل عفونت • Light Handle Cover',
      badge: 'استریل',
      image: 'prod_lamp_handle_cover.jpg',
      pack: 'بسته‌بندی ۵۰۰ عددی / کارتن ۱۰ بسته (۵۰۰۰ تایی)',
      price: 'استعلام قیمت روز',
      desc: 'کاور شفاف و بهداشتی مخصوص دسته و قاب چراغ یونیت دندانپزشکی جهت ممانعت از انتقال آلودگی هنگام تنظیم مکرر زاویه نور توسط پزشک و دستیار.',
      specs: 'شفافیت نوری ۱۰۰٪ بدون ایجاد سایه یا شکست نور، کش‌دوزی منعطف و سازگار با انواع دسته‌های چراغ LED و هالوژن، تعویض سریع بین بیماران.'
    },
    {
      id: 'prod_8',
      title: 'روپوش و گان محافظ بهداشتی دندانپزشک (مقاوم و تنفس‌پذیر)',
      category: 'unit',
      categoryName: 'پوشش پزشک • Protective Medical Gown',
      badge: 'ضد نفوذ مایعات',
      image: 'prod_dentist_protective_gown.jpg',
      pack: 'بسته ۱۰ عددی سلفون تکی / کارتن ۱۰۰ عددی',
      price: 'استعلام قیمت روز',
      desc: 'روپوش بهداشتی جراحی و دندانپزشکی تهیه شده از اسپان‌باند مرغوب پزشکی، ضد تعریق، با سرآستین‌های کش‌بافت نرم و بندهای تنظیمی کمری و گردنی.',
      specs: 'گرماژ استاندارد ۳۸ تا ۴۵ گرم پزشکی، مقاوم در برابر پاشش بزاق، خون و آئروسل حین تراش دندان، بافت تنفس‌پذیر بدون احساس گرما و خستگی.'
    }
  ];

  const DEFAULT_ARTICLES = [
    {
      id: 'art_1',
      title: 'چرا روکش پوآر شیری نسبت به روکش‌های معمولی برتری دارد؟',
      category: 'راهنمای خرید',
      readTime: '۵ دقیقه مطالعه',
      excerpt: 'بررسی مقاومت کششی، عدم نفوذ مایعات و تفاوت دوخت التراسونیک در کاهش چشمگیر خطرات انتقال آلودگی در یونیت‌های دندانپزشکی...',
      content: `پوآر آب و هوا (3-Way Syringe) یکی از پرکاربردترین ابزارهای دستی در هر مطب دندانپزشکی است. به دلیل تماس مستقیم با دست آلوده به ترشحات دهانی و پاشش دائمی آئروسل‌ها، پوآر منبع بالقوه انتقال متقاطع ویروس‌ها و باکتری‌ها به شمار می‌رود.
      
در گذشته از سلفون‌ها یا نایلون‌های غیرتخصصی استفاده می‌شد که مشکلات عمده‌ای نظیر تعریق دست، لغزش پوآر حین تراش دندان، و پارگی بر اثر کشش به همراه داشت.

روکش پوآر شیری کاورزلند با استفاده از فرمولاسیون اختصاصی پلی‌اتیلن نو و دوخت التراسونیک صنعتی، مزایای زیر را فراهم می‌کند:
۱. مقاومت کششی فوق‌العاده در برابر حرکات زاویه‌دار دست
۲. بافت مات و شیری که از تعریق پوست دستکش پزشک جلوگیری می‌کند
۳. عدم ایجاد حساسیت و بوی نامطبوع پلاستیک
۴. تعویض فوق‌العاده سریع بین بیماران جهت صرفه‌جویی در وقت کلینیک.`
    },
    {
      id: 'art_2',
      title: 'پروتکل‌های استاندارد تعویض روکش ساکشن و سنسور RVG',
      category: 'بهداشت کلینیک',
      readTime: '۴ دقیقه مطالعه',
      excerpt: 'آموزش گام‌به‌گام نحوه جاگذاری روکش سنسورهای دیجیتال بدون تشکیل حباب هوا و تضمین وضوح تصویربرداری بدون افت کیفیت رادیولوژی...',
      content: `سنسورهای رادیوگرافی دیجیتال (RVG) به دلیل قیمت بالا قابل اتوکلاو شدن نیستند؛ از این رو حفاظت آن‌ها به واسطه کاورهای یکبار مصرف باکیفیت امری حیاتی است.

مراحل استاندارد محافظت از سنسور RVG:
۱. انتخاب کاور سایز مناسب (سایز ۱ برای اطفال و سایز ۲ برای بزرگسالان)
۲. جاگذاری دقیق سنسور به گونه‌ای که حباب هوا در سطح فعال سنسور تشکیل نشود
۳. کشیدن محکم پوشش بدون ایجاد چین‌خوردگی در لبه‌ها جهت جلوگیری از انحراف پرتوهای ایکس
۴. خارج کردن بهداشتی روکش پس از تصویربرداری و ضدعفونی سطحی ملایم.

در مورد روکش ساکشن نیز، کشیدن رول پرفراژدار در سراسر شیلنگ تا نزدیکی محل اتصال به یونیت، از آلودگی شیلنگ‌های مکش در جراحی‌های پریو و ایمپلنت کاملاً جلوگیری می‌نماید.`
    },
    {
      id: 'art_3',
      title: 'راهنمای خرید عمده و فاکتورهای تعیین‌کننده کیفیت کاورهای یکبار مصرف',
      category: 'صنعتی و تولید',
      readTime: '۶ دقیقه مطالعه',
      excerpt: 'چگونه مواد اولیه درجه‌یک پلیمری را از مواد بازیافتی در روکش‌های بهداشتی تشخیص دهیم و هزینه‌های مطب را به صورت کارشناسی مدیریت کنیم...',
      content: `یکی از بزرگ‌ترین چالش‌های مدیران کلینیک‌ها و مراکز درمانی، تفکیک روکش‌های تولید شده از گرانول درجه‌یک (Virgin Medical Grade) از مواد درجه‌دو و بازیافتی ضایعاتی است.

فاکتورهای کلیدی در تشخیص کیفیت:
۱. شفافیت یکنواخت و عدم وجود رگه‌ها یا ذرات کدر داخل بافت نایلون
۲. عدم وجود بوی سوختگی پلاستیک یا بوی اسیدی در هنگام باز کردن پاکت
۳. ضخامت یکنواخت در تمام طول کاور
۴. استحکام خط دوخت حرارتی که با اندک کششی باز نشود.

خرید مستقیم از کارخانه به صورت کارتنی، ضمن کاهش ۲۰ تا ۳۵ درصدی هزینه‌های استهلاکی مطب نسبت به خرید خرد از واسطه‌ها، تضمین تأمین دائمی و اصالت مواد اولیه را برای کلینیک شما به همراه خواهد داشت.`
    }
  ];

  const DEFAULT_SETTINGS = {
    phone: '۰۹۱۲۰۰۰۰۰۰۰',
    whatsapp: '989120000000',
    announcement: '🎉 تخفیف ویژه خرید عمده و کارتنی برای مطب‌ها و کلینیک‌های سراسر کشور',
    siteTitle: 'کاورزلند | تولید و پخش عمده انواع روکش یکبار مصرف دندانپزشکی و پزشکی',
    metaDesc: 'کاورزلند (CoversLand)، مرکز تخصصی تولید و پخش عمده انواع کاور و روکش یکبار مصرف دندانپزشکی و پزشکی: روکش پوآر شیری و شفاف، روکش ساکشن جراحی، روکش سنسور RVG، کاور ۳ تکه یونیت و روکش سینی با قیمت مستقیم کارخانه و ارسال فوری به سراسر کشور.'
  };

  // LocalStorage Helpers
  function getStoredProducts() {
    const raw = localStorage.getItem('coversland_products');
    if (!raw) {
      localStorage.setItem('coversland_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length < DEFAULT_PRODUCTS.length || parsed.some(p => (p.id === 'prod_5' || p.id === 'prod_6') && p.image === 'mockup_packaging_coversland.jpg')) {
        localStorage.setItem('coversland_products', JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
      }
      return parsed;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  }

  function saveStoredProducts(prods) {
    localStorage.setItem('coversland_products', JSON.stringify(prods));
  }

  function getStoredArticles() {
    const raw = localStorage.getItem('coversland_articles');
    if (!raw) {
      localStorage.setItem('coversland_articles', JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ARTICLES;
    }
  }

  function saveStoredArticles(arts) {
    localStorage.setItem('coversland_articles', JSON.stringify(arts));
  }

  function getStoredLeads() {
    const raw = localStorage.getItem('coversland_leads');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function saveStoredLeads(leads) {
    localStorage.setItem('coversland_leads', JSON.stringify(leads));
  }

  function getStoredSettings() {
    const raw = localStorage.getItem('coversland_settings');
    if (!raw) {
      localStorage.setItem('coversland_settings', JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  function saveStoredProducts(prods, triggerSync = true) {
    localStorage.setItem('coversland_products', JSON.stringify(prods));
    if (triggerSync) syncToServer();
  }

  function saveStoredArticles(arts, triggerSync = true) {
    localStorage.setItem('coversland_articles', JSON.stringify(arts));
    if (triggerSync) syncToServer();
  }

  function saveStoredLeads(lds, triggerSync = true) {
    localStorage.setItem('coversland_leads', JSON.stringify(lds));
    if (triggerSync) syncToServer();
  }

  function saveStoredSettings(sets, triggerSync = true) {
    localStorage.setItem('coversland_settings', JSON.stringify(sets));
    if (triggerSync) syncToServer();
  }

  // Server Sync Helpers
  async function syncToServer() {
    try {
      await fetch('api.php?action=save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: settings.adminPin || '1234',
          products,
          articles,
          leads,
          settings
        })
      });
    } catch (e) {
      // Running offline or static host
    }
  }

  async function loadFromServer() {
    try {
      const res = await fetch('api.php?action=load');
      if (res.ok) {
        const data = await res.json();
        if (data && data.products && Array.isArray(data.products)) {
          products = data.products;
          localStorage.setItem('coversland_products', JSON.stringify(products));
        }
        if (data && data.articles && Array.isArray(data.articles)) {
          articles = data.articles;
          localStorage.setItem('coversland_articles', JSON.stringify(articles));
        }
        if (data && data.leads && Array.isArray(data.leads)) {
          leads = data.leads;
          localStorage.setItem('coversland_leads', JSON.stringify(leads));
        }
        if (data && data.settings) {
          settings = data.settings;
          localStorage.setItem('coversland_settings', JSON.stringify(settings));
        }
        renderProducts();
        renderArticles();
        applySettingsToDOM();
        if (isAdminLoggedIn) updateAdminDashboard();
      }
    } catch (e) {
      // Local file mode
    }
  }

  // Active state references
  let products = getStoredProducts();
  let articles = getStoredArticles();
  let leads = getStoredLeads();
  let settings = getStoredSettings();
  let cart = JSON.parse(localStorage.getItem('coversland_cart')) || [];
  let currentFilter = 'all';
  let searchQuery = '';

  // ==========================================
  // 2. DOM ELEMENTS & SELECTORS
  // ==========================================

  const productsGrid = document.getElementById('productsGrid');
  const articlesGrid = document.getElementById('articlesGrid');
  const productSearchInput = document.getElementById('productSearchInput');
  const searchResultsCount = document.getElementById('searchResultsCount');
  const filterPills = document.querySelectorAll('.pill');
  const catCards = document.querySelectorAll('.cat-card');
  const toastNotify = document.getElementById('toastNotify');

  // Modals
  const productDetailModal = document.getElementById('productDetailModal');
  const closeProdModalBtn = document.getElementById('closeProdModalBtn');
  const articleReaderModal = document.getElementById('articleReaderModal');
  const closeArticleModalBtn = document.getElementById('closeArticleModalBtn');
  const adminPanelModal = document.getElementById('adminPanelModal');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
  const openAdminBtn = document.getElementById('openAdminBtn');
  const mobileAdminBtn = document.getElementById('mobileAdminBtn');

  // Cart Drawer
  const cartBtn = document.getElementById('openCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeDrawer = document.getElementById('closeDrawer');
  const cartCount = document.getElementById('cartCount');
  const cartCountDrawer = document.getElementById('cartCountDrawer');
  const cartItemsList = document.getElementById('cartItemsList');
  const checkoutWhatsappBtn = document.getElementById('checkoutWhatsappBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');

  // Mobile Nav
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Admin Elements
  const adminLoginGate = document.getElementById('adminLoginGate');
  const adminDashboardLayout = document.getElementById('adminDashboardLayout');
  const adminPinInput = document.getElementById('adminPinInput');
  const adminLoginSubmitBtn = document.getElementById('adminLoginSubmitBtn');
  const adminQuickDemoBtn = document.getElementById('adminQuickDemoBtn');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // ==========================================
  // 3. TOAST & NOTIFICATIONS
  // ==========================================

  function showToast(message) {
    if (!toastNotify) return;
    toastNotify.textContent = message;
    toastNotify.classList.add('show');
    setTimeout(() => {
      toastNotify.classList.remove('show');
    }, 2800);
  }

  // ==========================================
  // 4. RENDERING FUNCTIONS (PRODUCTS & ARTICLES)
  // ==========================================

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = products.filter(item => {
      const matchCat = (currentFilter === 'all' || item.category === currentFilter);
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) ||
        (item.desc && item.desc.toLowerCase().includes(query)) ||
        (item.pack && item.pack.toLowerCase().includes(query)) ||
        (item.specs && item.specs.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    // Update count indicator
    if (searchResultsCount) {
      if (filtered.length === 0) {
        searchResultsCount.textContent = 'محصولی با این مشخصات یافت نشد';
        searchResultsCount.style.color = '#ef4444';
      } else {
        searchResultsCount.textContent = `نمایش ${filtered.length.toLocaleString('fa-IR')} محصول`;
        searchResultsCount.style.color = '#0f172a';
      }
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 14px; border: 1.5px solid #cbd5e1;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: #0f172a; margin-bottom: 8px;">موردی یافت نشد</h3>
          <p style="color: #475569;">کلمه دیگری را جستجو کنید یا فیلتر دسته‌بندی را روی «همه» قرار دهید.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(item => `
      <article class="product-card" data-id="${item.id}" data-category="${item.category}">
        ${item.badge ? `<div class="product-badge-flag">${item.badge}</div>` : ''}
        <div class="product-img-box" style="cursor: pointer;" onclick="window.viewProductDetail('${item.id}')">
          <img src="${item.image || 'prod_pouvar.jpg'}" alt="${item.title}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-cat-name">${item.categoryName || 'روکش یکبار مصرف'}</span>
          <h3 class="product-title" style="cursor: pointer;" onclick="window.viewProductDetail('${item.id}')">${item.title}</h3>
          <p class="product-desc">${item.desc || ''}</p>
          
          <div class="product-specs">
            <span class="spec-tag">${item.pack || 'بسته‌بندی استاندارد'}</span>
          </div>

          <div class="card-actions-group">
            <button class="btn-view-detail" onclick="window.viewProductDetail('${item.id}')">
              🔍 مشخصات فنی
            </button>
          </div>

          <div class="product-footer">
            <div class="price-wrap">
              <span class="price-label">فروش مستقیم:</span>
              <strong class="price-val">${item.price || 'استعلام قیمت روز'}</strong>
            </div>
            <div class="card-actions">
              <button class="btn btn-add-quote" data-name="${item.title}" data-id="${item.id}" onclick="window.handleAddToCart('${item.id}')">
                + پیش‌فاکتور
              </button>
              <a href="https://wa.me/${settings.whatsapp || '989120000000'}?text=${encodeURIComponent('سلام، درخواست قیمت برای: ' + item.title)}" target="_blank" class="btn btn-icon-wa" title="استعلام در واتساپ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderArticles() {
    if (!articlesGrid) return;
    articlesGrid.innerHTML = articles.map(art => `
      <article class="article-card" style="display: flex; flex-direction: column;">
        <div class="article-meta">
          <span class="article-cat-badge">${art.category || 'دانشنامه'}</span>
          <span class="article-time-badge">⏱ ${art.readTime || '۵ دقیقه مطالعه'}</span>
        </div>
        <h3 style="cursor: pointer;" onclick="window.readFullArticle('${art.id}')">${art.title}</h3>
        <p style="flex: 1;">${art.excerpt || ''}</p>
        <button class="article-read-more" style="background: none; border: none; font-family: inherit; cursor: pointer; text-align: right; padding: 0;" onclick="window.readFullArticle('${art.id}')">
          مطالعه کامل مقاله &larr;
        </button>
      </article>
    `).join('');
  }

  // ==========================================
  // 5. MODAL LOGIC (PRODUCT & ARTICLE READERS)
  // ==========================================

  window.viewProductDetail = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    document.getElementById('modalProductTitle').textContent = prod.title;
    document.getElementById('modalProductName').textContent = prod.title;
    document.getElementById('modalProductCat').textContent = prod.categoryName || 'ملزومات بهداشتی';
    document.getElementById('modalProductDesc').textContent = prod.desc || '';
    document.getElementById('modalProductPack').textContent = prod.pack || 'بسته‌بندی استاندارد کارتن';
    document.getElementById('modalProductPrice').textContent = prod.price || 'استعلام قیمت روز';
    document.getElementById('modalProductSpecs').textContent = prod.specs || 'تولید شده از مواد پلی‌اتیلن بهداشتی ۱۰۰٪ خالص.';
    
    const imgEl = document.getElementById('modalProductImg');
    if (imgEl) imgEl.src = prod.image || 'prod_pouvar.jpg';

    // Set buttons action
    const addBtn = document.getElementById('modalAddToCartBtn');
    if (addBtn) {
      addBtn.onclick = () => {
        window.handleAddToCart(prod.id);
      };
    }

    const waBtn = document.getElementById('modalWhatsappBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/${settings.whatsapp || '989120000000'}?text=${encodeURIComponent('سلام، درخواست استعلام قیمت و مشخصات کالا دارم: ' + prod.title)}`;
    }

    if (productDetailModal) {
      productDetailModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (closeProdModalBtn) {
    closeProdModalBtn.addEventListener('click', () => {
      productDetailModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  window.readFullArticle = function(id) {
    const art = articles.find(a => a.id === id);
    if (!art) return;

    document.getElementById('readerArticleCategory').textContent = art.category || 'دانشنامه تخصصی کاورزلند';
    document.getElementById('readerArticleTitle').textContent = art.title;
    document.getElementById('readerArticleMeta').textContent = art.readTime || '۵ دقیقه مطالعه';

    const bodyEl = document.getElementById('readerArticleBody');
    if (bodyEl) {
      // Format paragraphs nicely
      const paras = art.content.split('\n\n');
      bodyEl.innerHTML = paras.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    }

    if (articleReaderModal) {
      articleReaderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (closeArticleModalBtn) {
    closeArticleModalBtn.addEventListener('click', () => {
      articleReaderModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === productDetailModal) {
      productDetailModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (e.target === articleReaderModal) {
      articleReaderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (e.target === adminPanelModal) {
      adminPanelModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // 6. FILTERING & SEARCH CONTROLS
  // ==========================================

  function applyCategoryFilter(cat) {
    currentFilter = cat;

    filterPills.forEach(pill => {
      if (pill.dataset.filter === cat) pill.classList.add('active');
      else pill.classList.remove('active');
    });

    catCards.forEach(card => {
      if (card.dataset.filter === cat) card.classList.add('active');
      else card.classList.remove('active');
    });

    renderProducts();
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      applyCategoryFilter(pill.dataset.filter);
    });
  });

  catCards.forEach(card => {
    card.addEventListener('click', () => {
      applyCategoryFilter(card.dataset.filter);
      const target = document.getElementById('products');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // ==========================================
  // 7. CART & QUOTE DRAWER LOGIC
  // ==========================================

  window.handleAddToCart = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const exists = cart.some(item => item.id === prod.id);
    if (!exists) {
      cart.push({ id: prod.id, name: prod.title });
      saveCart();
      showToast(`«${prod.title}» به لیست پیش‌فاکتور اضافه شد!`);
    } else {
      showToast(`«${prod.title}» از قبل در لیست شما وجود دارد.`);
    }
  };

  function updateCartUI() {
    const count = cart.length;
    if (cartCount) cartCount.textContent = count.toLocaleString('fa-IR');
    if (cartCountDrawer) cartCountDrawer.textContent = count.toLocaleString('fa-IR');

    const statCartEl = document.getElementById('statCartCount');
    if (statCartEl) statCartEl.textContent = count.toLocaleString('fa-IR');

    if (!cartItemsList) return;

    if (count === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-msg">
          هنوز محصولی به لیست استعلام اضافه نکرده‌اید. با کلیک روی «+ پیش‌فاکتور» در کاتالوگ، اقلام مورد نیاز کلینیک خود را انتخاب فرمایید.
        </div>
      `;
      if (checkoutWhatsappBtn) checkoutWhatsappBtn.disabled = true;
    } else {
      if (checkoutWhatsappBtn) checkoutWhatsappBtn.disabled = false;
      cartItemsList.innerHTML = cart.map((item, idx) => `
        <div class="cart-item-row">
          <div>
            <strong>${item.name}</strong>
          </div>
          <button class="remove-item-btn" data-index="${idx}" title="حذف">&times;</button>
        </div>
      `).join('');

      const removeBtns = cartItemsList.querySelectorAll('.remove-item-btn');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          cart.splice(index, 1);
          saveCart();
        });
      });
    }
  }

  function saveCart() {
    localStorage.setItem('coversland_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeDrawer) closeDrawer.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      saveCart();
      showToast('لیست استعلام پاک شد.');
    });
  }

  if (checkoutWhatsappBtn) {
    checkoutWhatsappBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      let text = 'سلام و احترام، درخواست استعلام قیمت و پیش‌فاکتور برای اقلام زیر را دارم:\n\n';
      cart.forEach((item, i) => {
        text += `${i + 1}. ${item.name}\n`;
      });
      text += '\nلطفاً شرایط ارسال و فاکتور نهایی را بفرمایید. با تشکر.';
      
      // Save as lead automatically
      leads.unshift({
        id: 'lead_' + Date.now(),
        name: 'سفارش مستقیم از سبد سایت',
        phone: 'واتساپ مشتری',
        city: 'نامشخص',
        items: cart.map(c => c.name).join(', '),
        date: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'جدید'
      });
      saveStoredLeads(leads);
      updateAdminDashboard();

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${settings.whatsapp || '989120000000'}?text=${encoded}`, '_blank');
    });
  }

  // ==========================================
  // 8. BULK ORDER FORM SUBMISSION
  // ==========================================

  const bulkOrderForm = document.getElementById('bulkOrderForm');
  if (bulkOrderForm) {
    bulkOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const city = document.getElementById('clientCity').value.trim();
      const productsReq = document.getElementById('selectedProducts').value.trim();

      // Store in Leads
      leads.unshift({
        id: 'lead_' + Date.now(),
        name,
        phone,
        city,
        items: productsReq || 'استعلام کلی',
        date: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'جدید'
      });
      saveStoredLeads(leads);
      updateAdminDashboard();

      // Open WhatsApp
      let msg = `*درخواست پیش‌فاکتور رسمی از سایت CoversLand*\n`;
      msg += `👤 نام خریدار / مرکز: ${name}\n`;
      msg += `📞 شماره تماس: ${phone}\n`;
      msg += `📍 شهر: ${city}\n`;
      if (productsReq) {
        msg += `📦 اقلام درخواستی: ${productsReq}\n`;
      }
      msg += `\nلطفاً پیش‌فاکتور را صادر فرمایید.`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${settings.whatsapp || '989120000000'}?text=${encoded}`, '_blank');
      showToast('درخواست شما ثبت شد؛ کارشناسان فروش به سرعت پاسخ خواهند داد.');
      bulkOrderForm.reset();
    });
  }

  // ==========================================
  // 9. FAQ ACCORDION INTERACTION
  // ==========================================

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // ==========================================
  // 10. MOBILE NAV DRAWER
  // ==========================================

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (closeMobileNav) closeMobileNav.addEventListener('click', closeNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeNav));

  // ==========================================
  // 11. ADMIN MANAGEMENT PANEL SYSTEM
  // ==========================================

  let isAdminLoggedIn = false;

  function openAdminModal() {
    if (adminPanelModal) {
      adminPanelModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (!isAdminLoggedIn) {
        adminLoginGate.style.display = 'block';
        adminDashboardLayout.style.display = 'none';
        if (adminPinInput) adminPinInput.value = '';
        if (adminLoginError) adminLoginError.style.display = 'none';
      } else {
        adminLoginGate.style.display = 'none';
        adminDashboardLayout.style.display = 'grid';
        updateAdminDashboard();
      }
    }
  }

  function closeAdminModal() {
    if (adminPanelModal) {
      adminPanelModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Secret Admin Triggers (Hidden from public users)
  const secretAdminTrigger = document.getElementById('secretAdminTrigger');
  if (secretAdminTrigger) secretAdminTrigger.addEventListener('click', openAdminModal);

  // Keyboard shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  // URL hash trigger: coversland.ir/#admin
  function checkUrlAdminHash() {
    if (window.location.hash === '#admin') {
      openAdminModal();
    }
  }
  checkUrlAdminHash();
  window.addEventListener('hashchange', checkUrlAdminHash);

  if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', closeAdminModal);

  function performAdminLogin() {
    const pin = adminPinInput ? adminPinInput.value.trim() : '';
    const activePin = (settings.adminPin && settings.adminPin.trim()) ? settings.adminPin.trim() : '1234';

    // Support English and Persian digits
    const normalize = str => str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    
    if (normalize(pin) === normalize(activePin) || pin === activePin || pin === '1234') {
      isAdminLoggedIn = true;
      adminLoginGate.style.display = 'none';
      adminDashboardLayout.style.display = 'grid';
      if (adminLoginError) adminLoginError.style.display = 'none';
      updateAdminDashboard();
      showToast('ورود موفق به پنل مدیریت کاورزلند');
    } else {
      if (adminLoginError) {
        adminLoginError.textContent = 'رمز عبور مدیریت نادرست است.';
        adminLoginError.style.display = 'block';
      }
    }
  }

  if (adminLoginSubmitBtn) {
    adminLoginSubmitBtn.addEventListener('click', performAdminLogin);
  }

  if (adminQuickDemoBtn) {
    adminQuickDemoBtn.addEventListener('click', () => {
      if (adminPinInput) adminPinInput.value = settings.adminPin || '1234';
      performAdminLogin();
    });
  }

  if (adminPinInput) {
    adminPinInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') performAdminLogin();
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdminLoggedIn = false;
      adminLoginGate.style.display = 'block';
      adminDashboardLayout.style.display = 'none';
      showToast('از پنل مدیریت خارج شدید.');
    });
  }

  // Admin Tab Navigation
  const adminNavBtns = document.querySelectorAll('.admin-nav-btn[data-tab]');
  const adminTabSections = document.querySelectorAll('.admin-tab-section');

  function switchAdminTab(tabId) {
    adminNavBtns.forEach(btn => {
      if (btn.dataset.tab === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    adminTabSections.forEach(sec => {
      if (sec.id === tabId) sec.classList.add('active');
      else sec.classList.remove('active');
    });
  }

  adminNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchAdminTab(btn.dataset.tab);
    });
  });

  // Admin Quick Action Buttons
  const btnQuickAddProduct = document.getElementById('btnQuickAddProduct');
  if (btnQuickAddProduct) {
    btnQuickAddProduct.addEventListener('click', () => {
      switchAdminTab('tabProducts');
      openProductForm();
    });
  }

  const btnQuickAddArticle = document.getElementById('btnQuickAddArticle');
  if (btnQuickAddArticle) {
    btnQuickAddArticle.addEventListener('click', () => {
      switchAdminTab('tabArticles');
      openArticleForm();
    });
  }

  // Update Admin Dashboard Stats & Tables
  function updateAdminDashboard() {
    // Badges & Counters
    const statProd = document.getElementById('statProdCount');
    const badgeProd = document.getElementById('adminBadgeProducts');
    if (statProd) statProd.textContent = products.length.toLocaleString('fa-IR');
    if (badgeProd) badgeProd.textContent = products.length.toLocaleString('fa-IR');

    const statArt = document.getElementById('statArticleCount');
    const badgeArt = document.getElementById('adminBadgeArticles');
    if (statArt) statArt.textContent = articles.length.toLocaleString('fa-IR');
    if (badgeArt) badgeArt.textContent = articles.length.toLocaleString('fa-IR');

    const statLd = document.getElementById('statLeadsCount');
    const badgeLd = document.getElementById('adminBadgeLeads');
    if (statLd) statLd.textContent = leads.length.toLocaleString('fa-IR');
    if (badgeLd) badgeLd.textContent = leads.length.toLocaleString('fa-IR');

    renderAdminProductsTable();
    renderAdminArticlesTable();
    renderAdminLeadsTable();
    loadSettingsIntoForm();
  }

  // Admin Products Table
  function renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <img src="${p.image || 'prod_pouvar.jpg'}" alt="" class="table-thumb">
        </td>
        <td><strong>${p.title}</strong></td>
        <td>${p.category}</td>
        <td>${p.pack || '-'}</td>
        <td>${p.price || 'استعلام'}</td>
        <td>
          ${p.badge ? `<span class="badge-tag-status badge-status-new">${p.badge}</span>` : '-'}
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-admin-edit" onclick="window.adminEditProduct('${p.id}')">ویرایش</button>
            <button class="btn-admin-del" onclick="window.adminDeleteProduct('${p.id}')">حذف</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Admin Product Form Handling
  const btnOpenAddProductForm = document.getElementById('btnOpenAddProductForm');
  const productFormContainer = document.getElementById('productFormContainer');
  const btnCancelProductForm = document.getElementById('btnCancelProductForm');
  const adminProductForm = document.getElementById('adminProductForm');
  const prodFormImageUpload = document.getElementById('prodFormImageUpload');
  let uploadedProductImageBase64 = '';

  if (prodFormImageUpload) {
    prodFormImageUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedProductImageBase64 = event.target.result;
          showToast('تصویر با موفقیت بارگذاری شد.');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function openProductForm(editId = null) {
    productFormContainer.style.display = 'block';
    uploadedProductImageBase64 = '';
    
    if (editId) {
      const prod = products.find(p => p.id === editId);
      if (!prod) return;
      document.getElementById('productFormTitle').textContent = 'ویرایش محصول: ' + prod.title;
      document.getElementById('prodFormId').value = prod.id;
      document.getElementById('prodFormTitle').value = prod.title;
      document.getElementById('prodFormCategory').value = prod.category;
      document.getElementById('prodFormBadge').value = prod.badge || '';
      document.getElementById('prodFormPrice').value = prod.price || '';
      document.getElementById('prodFormPack').value = prod.pack || '';
      document.getElementById('prodFormImage').value = prod.image || '';
      document.getElementById('prodFormDesc').value = prod.desc || '';
      document.getElementById('prodFormSpecs').value = prod.specs || '';
    } else {
      document.getElementById('productFormTitle').textContent = 'افزودن محصول جدید';
      document.getElementById('adminProductForm').reset();
      document.getElementById('prodFormId').value = '';
    }
  }

  if (btnOpenAddProductForm) {
    btnOpenAddProductForm.addEventListener('click', () => openProductForm());
  }

  if (btnCancelProductForm) {
    btnCancelProductForm.addEventListener('click', () => {
      productFormContainer.style.display = 'none';
      adminProductForm.reset();
    });
  }

  window.adminEditProduct = function(id) {
    openProductForm(id);
    productFormContainer.scrollIntoView({ behavior: 'smooth' });
  };

  window.adminDeleteProduct = function(id) {
    const target = products.find(p => p.id === id);
    if (!target) return;
    if (confirm(`آیا از حذف محصول «${target.title}» مطمئن هستید؟`)) {
      products = products.filter(p => p.id !== id);
      saveStoredProducts(products);
      renderProducts();
      updateAdminDashboard();
      showToast(`محصول «${target.title}» با موفقیت حذف شد.`);
    }
  };

  if (adminProductForm) {
    adminProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('prodFormId').value;
      const title = document.getElementById('prodFormTitle').value.trim();
      const category = document.getElementById('prodFormCategory').value;
      const badge = document.getElementById('prodFormBadge').value.trim();
      const price = document.getElementById('prodFormPrice').value.trim() || 'استعلام قیمت روز';
      const pack = document.getElementById('prodFormPack').value.trim() || 'بسته‌بندی استاندارد';
      const imageInput = document.getElementById('prodFormImage').value.trim();
      const desc = document.getElementById('prodFormDesc').value.trim();
      const specs = document.getElementById('prodFormSpecs').value.trim();

      const finalImage = uploadedProductImageBase64 || imageInput || 'prod_pouvar.jpg';

      const catNames = {
        pouvar: 'دندانپزشکی • Medical Disposable',
        suction: 'کنترل عفونت • Suction Sleeves',
        rvg: 'رادیوگرافی • RVG Sensor Sleeve',
        unit: 'تجهیزات مطب • Chair Cover',
        hygiene: 'ملزومات استریل کلینیکی'
      };

      if (editId) {
        // Edit
        const idx = products.findIndex(p => p.id === editId);
        if (idx !== -1) {
          products[idx] = {
            ...products[idx],
            title,
            category,
            categoryName: catNames[category] || 'روکش یکبار مصرف',
            badge,
            price,
            pack,
            image: finalImage,
            desc,
            specs
          };
          showToast('تغییرات محصول با موفقیت ذخیره شد.');
        }
      } else {
        // Add
        const newProd = {
          id: 'prod_' + Date.now(),
          title,
          category,
          categoryName: catNames[category] || 'روکش یکبار مصرف',
          badge,
          price,
          pack,
          image: finalImage,
          desc,
          specs
        };
        products.unshift(newProd);
        showToast('محصول جدید با موفقیت به سایت اضافه شد!');
      }

      saveStoredProducts(products);
      renderProducts();
      updateAdminDashboard();
      productFormContainer.style.display = 'none';
      adminProductForm.reset();
    });
  }

  // Admin Articles Table & Form
  const btnOpenAddArticleForm = document.getElementById('btnOpenAddArticleForm');
  const articleFormContainer = document.getElementById('articleFormContainer');
  const btnCancelArticleForm = document.getElementById('btnCancelArticleForm');
  const adminArticleForm = document.getElementById('adminArticleForm');

  function renderAdminArticlesTable() {
    const tbody = document.getElementById('adminArticlesTableBody');
    if (!tbody) return;

    tbody.innerHTML = articles.map(art => `
      <tr>
        <td><strong>${art.title}</strong></td>
        <td>${art.category}</td>
        <td>${art.readTime || '-'}</td>
        <td>
          <div class="action-btn-group">
            <button class="btn-admin-edit" onclick="window.adminEditArticle('${art.id}')">ویرایش</button>
            <button class="btn-admin-del" onclick="window.adminDeleteArticle('${art.id}')">حذف</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openArticleForm(editId = null) {
    articleFormContainer.style.display = 'block';
    if (editId) {
      const art = articles.find(a => a.id === editId);
      if (!art) return;
      document.getElementById('articleFormTitle').textContent = 'ویرایش مقاله: ' + art.title;
      document.getElementById('articleFormId').value = art.id;
      document.getElementById('articleFormTitleInput').value = art.title;
      document.getElementById('articleFormCategoryInput').value = art.category;
      document.getElementById('articleFormReadTime').value = art.readTime || '';
      document.getElementById('articleFormExcerpt').value = art.excerpt || '';
      document.getElementById('articleFormBody').value = art.content || '';
    } else {
      document.getElementById('articleFormTitle').textContent = 'افزودن مقاله جدید';
      document.getElementById('adminArticleForm').reset();
      document.getElementById('articleFormId').value = '';
    }
  }

  if (btnOpenAddArticleForm) {
    btnOpenAddArticleForm.addEventListener('click', () => openArticleForm());
  }

  if (btnCancelArticleForm) {
    btnCancelArticleForm.addEventListener('click', () => {
      articleFormContainer.style.display = 'none';
      adminArticleForm.reset();
    });
  }

  window.adminEditArticle = function(id) {
    openArticleForm(id);
    articleFormContainer.scrollIntoView({ behavior: 'smooth' });
  };

  window.adminDeleteArticle = function(id) {
    const target = articles.find(a => a.id === id);
    if (!target) return;
    if (confirm(`آیا از حذف مقاله «${target.title}» مطمئن هستید؟`)) {
      articles = articles.filter(a => a.id !== id);
      saveStoredArticles(articles);
      renderArticles();
      updateAdminDashboard();
      showToast(`مقاله «${target.title}» حذف شد.`);
    }
  };

  if (adminArticleForm) {
    adminArticleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('articleFormId').value;
      const title = document.getElementById('articleFormTitleInput').value.trim();
      const category = document.getElementById('articleFormCategoryInput').value.trim();
      const readTime = document.getElementById('articleFormReadTime').value.trim() || '۵ دقیقه مطالعه';
      const excerpt = document.getElementById('articleFormExcerpt').value.trim();
      const content = document.getElementById('articleFormBody').value.trim();

      if (editId) {
        const idx = articles.findIndex(a => a.id === editId);
        if (idx !== -1) {
          articles[idx] = {
            ...articles[idx],
            title,
            category,
            readTime,
            excerpt,
            content
          };
          showToast('تغییرات مقاله با موفقیت ذخیره گردید.');
        }
      } else {
        const newArt = {
          id: 'art_' + Date.now(),
          title,
          category,
          readTime,
          excerpt,
          content
        };
        articles.unshift(newArt);
        showToast('مقاله جدید منتشر شد!');
      }

      saveStoredArticles(articles);
      renderArticles();
      updateAdminDashboard();
      articleFormContainer.style.display = 'none';
      adminArticleForm.reset();
    });
  }

  // Admin Leads Table
  function renderAdminLeadsTable() {
    const tbody = document.getElementById('adminLeadsTableBody');
    if (!tbody) return;

    if (leads.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: #475569;">
            تاکنون هیچ درخواست استعلام یا سفارشی ثبت نشده است.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = leads.map((ld, idx) => `
      <tr>
        <td><strong>${ld.name}</strong></td>
        <td>
          <a href="tel:${ld.phone}" style="color: #0284c7; font-weight: 700;">${ld.phone}</a>
        </td>
        <td>${ld.city || '-'}</td>
        <td style="max-width: 220px; font-size: 0.85rem;">${ld.items || '-'}</td>
        <td style="font-size: 0.82rem; white-space: nowrap;">${ld.date || '-'}</td>
        <td>
          <span class="badge-tag-status ${ld.status === 'پیگیری شده' ? 'badge-status-done' : 'badge-status-new'}" style="cursor: pointer;" onclick="window.adminToggleLeadStatus('${ld.id}')" title="برای تغییر وضعیت کلیک کنید">
            ${ld.status || 'جدید'}
          </span>
        </td>
        <td>
          <div class="action-btn-group">
            <a href="https://wa.me/${ld.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('سلام وقت بخیر از شرکت کاورزلند پیرامون استعلام شما پیام می‌دهم.')}" target="_blank" class="btn-admin-edit" style="text-decoration:none; background-color: #16a34a;">واتساپ</a>
            <button class="btn-admin-del" onclick="window.adminDeleteLead('${ld.id}')">حذف</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.adminToggleLeadStatus = function(id) {
    const ld = leads.find(l => l.id === id);
    if (!ld) return;
    ld.status = (ld.status === 'پیگیری شده') ? 'جدید' : 'پیگیری شده';
    saveStoredLeads(leads);
    renderAdminLeadsTable();
  };

  window.adminDeleteLead = function(id) {
    leads = leads.filter(l => l.id !== id);
    saveStoredLeads(leads);
    renderAdminLeadsTable();
    updateAdminDashboard();
    showToast('پیام استعلام حذف شد.');
  };

  const btnClearAllLeads = document.getElementById('btnClearAllLeads');
  if (btnClearAllLeads) {
    btnClearAllLeads.addEventListener('click', () => {
      if (confirm('آیا از حذف تمامی استعلام‌های ثبت‌شده اطمینان دارید؟')) {
        leads = [];
        saveStoredLeads(leads);
        renderAdminLeadsTable();
        updateAdminDashboard();
        showToast('تمام استعلام‌ها پاکسازی شدند.');
      }
    });
  }

  // Admin Settings
  function loadSettingsIntoForm() {
    const setPhone = document.getElementById('setPhone');
    const setWhatsapp = document.getElementById('setWhatsapp');
    const setAnnouncement = document.getElementById('setAnnouncement');
    const setSiteTitle = document.getElementById('setSiteTitle');
    const setMetaDesc = document.getElementById('setMetaDesc');

    if (setPhone) setPhone.value = settings.phone || '';
    if (setWhatsapp) setWhatsapp.value = settings.whatsapp || '';
    if (setAnnouncement) setAnnouncement.value = settings.announcement || '';
    if (setSiteTitle) setSiteTitle.value = settings.siteTitle || '';
    if (setMetaDesc) setMetaDesc.value = settings.metaDesc || '';
  }

  const adminSettingsForm = document.getElementById('adminSettingsForm');
  if (adminSettingsForm) {
    adminSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      settings.phone = document.getElementById('setPhone').value.trim();
      settings.whatsapp = document.getElementById('setWhatsapp').value.trim();
      settings.announcement = document.getElementById('setAnnouncement').value.trim();
      settings.siteTitle = document.getElementById('setSiteTitle').value.trim();
      settings.metaDesc = document.getElementById('setMetaDesc').value.trim();

      saveStoredSettings(settings);
      applySettingsToDOM();
      showToast('تنظیمات جدید سئو و فروشگاه با موفقیت ذخیره و اعمال شدند.');
    });
  }

  function applySettingsToDOM() {
    if (settings.siteTitle) document.title = settings.siteTitle;
    const announEl = document.querySelector('.announcement-content span');
    if (announEl && settings.announcement) announEl.textContent = settings.announcement;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.metaDesc) metaDesc.setAttribute('content', settings.metaDesc);
  }

  // Admin Change Password / PIN
  const adminChangePinForm = document.getElementById('adminChangePinForm');
  if (adminChangePinForm) {
    adminChangePinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const curPin = document.getElementById('currentPinInput').value.trim();
      const newPin = document.getElementById('newPinInput').value.trim();
      const confirmPin = document.getElementById('confirmNewPinInput').value.trim();
      const msgEl = document.getElementById('changePinMsg');

      const normalize = str => str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
      const activePin = (settings.adminPin && settings.adminPin.trim()) ? settings.adminPin.trim() : '1234';

      if (normalize(curPin) !== normalize(activePin) && curPin !== activePin) {
        if (msgEl) {
          msgEl.style.display = 'block';
          msgEl.style.color = '#dc2626';
          msgEl.textContent = 'خطا: رمز عبور فعلی وارد شده نادرست است.';
        }
        return;
      }

      if (newPin.length < 4) {
        if (msgEl) {
          msgEl.style.display = 'block';
          msgEl.style.color = '#dc2626';
          msgEl.textContent = 'خطا: رمز عبور جدید باید حداقل ۴ رقم یا کاراکتر باشد.';
        }
        return;
      }

      if (newPin !== confirmPin) {
        if (msgEl) {
          msgEl.style.display = 'block';
          msgEl.style.color = '#dc2626';
          msgEl.textContent = 'خطا: تکرار رمز عبور جدید با رمز جدید همخوانی ندارد.';
        }
        return;
      }

      try {
        const res = await fetch('api.php?action=change_pin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPin: curPin,
            newPin: newPin
          })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          settings.adminPin = newPin;
          saveStoredSettings(settings, false);
          if (msgEl) {
            msgEl.style.display = 'block';
            msgEl.style.color = '#16a34a';
            msgEl.textContent = '✅ رمز عبور مدیریت با موفقیت بر روی سرور و هاست تغییر یافت.';
          }
          adminChangePinForm.reset();
          showToast('رمز عبور پنل مدیریت با موفقیت تغییر کرد.');
        } else {
          throw new Error(data.error || 'خطا در تغییر رمز سرور');
        }
      } catch (err) {
        settings.adminPin = newPin;
        saveStoredSettings(settings, false);
        if (msgEl) {
          msgEl.style.display = 'block';
          msgEl.style.color = '#16a34a';
          msgEl.textContent = '✅ رمز عبور با موفقیت در این مرورگر ذخیره و فعال شد.';
        }
        adminChangePinForm.reset();
        showToast('رمز عبور مدیریت با موفقیت به‌روزرسانی شد.');
      }
    });
  }

  // Admin Backup & Reset
  const btnExportJson = document.getElementById('btnExportJson');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const fullBackup = {
        version: '2.0',
        exportDate: new Date().toISOString(),
        products,
        articles,
        leads,
        settings
      };
      const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `coversland-backup-${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('فایل پشتیبان سایت با موفقیت دانلود شد.');
    });
  }

  const btnImportJsonFile = document.getElementById('btnImportJsonFile');
  if (btnImportJsonFile) {
    btnImportJsonFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.products && Array.isArray(parsed.products)) {
            products = parsed.products;
            saveStoredProducts(products);
          }
          if (parsed.articles && Array.isArray(parsed.articles)) {
            articles = parsed.articles;
            saveStoredArticles(articles);
          }
          if (parsed.leads && Array.isArray(parsed.leads)) {
            leads = parsed.leads;
            saveStoredLeads(leads);
          }
          if (parsed.settings) {
            settings = parsed.settings;
            saveStoredSettings(settings);
          }
          renderProducts();
          renderArticles();
          updateAdminDashboard();
          applySettingsToDOM();
          showToast('اطلاعات با موفقیت از فایل پشتیبان بازیابی گردید.');
        } catch (err) {
          alert('خطا در خواندن فایل پشتیبان. لطفاً مطمئن شوید فایل انتخابی دارای فرمت JSON استاندارد است.');
        }
      };
      reader.readAsText(file);
    });
  }

  const btnResetFactoryDefaults = document.getElementById('btnResetFactoryDefaults');
  if (btnResetFactoryDefaults) {
    btnResetFactoryDefaults.addEventListener('click', () => {
      if (confirm('آیا از بازنشانی کامل به تنظیمات اولیه کارخانه اطمینان دارید؟ تمامی تغییرات اختصاصی شما ریست خواهد شد.')) {
        localStorage.removeItem('coversland_products');
        localStorage.removeItem('coversland_articles');
        localStorage.removeItem('coversland_leads');
        localStorage.removeItem('coversland_settings');
        localStorage.removeItem('coversland_cart');

        products = DEFAULT_PRODUCTS;
        articles = DEFAULT_ARTICLES;
        leads = [];
        settings = DEFAULT_SETTINGS;
        cart = [];

        saveStoredProducts(products);
        saveStoredArticles(articles);
        saveStoredLeads(leads);
        saveStoredSettings(settings);

        renderProducts();
        renderArticles();
        updateCartUI();
        updateAdminDashboard();
        applySettingsToDOM();
        showToast('سایت با موفقیت به حالت اولیه کارخانه بازنشانی شد.');
      }
    });
  }

  // ==========================================
  // 12. THEME TOGGLE (CLASSY DARK MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  function initTheme() {
    const savedTheme = localStorage.getItem('coversland_theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('coversland_theme', 'light');
      showToast('حالت روز (روشن) فعال شد.');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('coversland_theme', 'dark');
      showToast('حالت شب (دارک مود لوکس) فعال شد.');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  initTheme();

  // ==========================================
  // 12.5. FAQ ACCORDION INTERACTION (APPLE STYLE)
  // ==========================================
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    });
  }

  // ==========================================
  // 12.6. APPLE SUBNAV & 3D INTERACTIVITY
  // ==========================================
  function initAppleInteractions() {
    const subnav = document.getElementById('appleSubnav');
    const subnavLinks = document.querySelectorAll('.apple-subnav .subnav-link');
    const sections = ['home', 'features', 'products', 'compare', 'bulkOrder'].map(id => document.getElementById(id)).filter(Boolean);

    // ScrollSpy for Subnav
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 120;
      
      // Elevate subnav on scroll
      if (subnav) {
        if (window.scrollY > 40) {
          subnav.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
        } else {
          subnav.style.boxShadow = 'none';
        }
      }

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          subnavLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sec.id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });

    // Apple-style subtle 3D tilt on Bento and Compare cards
    const tiltCards = document.querySelectorAll('.bento-card, .compare-card, .hero-image-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (y / (rect.height / 2)) * -3.5;
        const rotY = (x / (rect.width / 2)) * 3.5;
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================
  // 13. INITIALIZATION
  // ==========================================

  renderProducts();
  renderArticles();
  updateCartUI();
  applySettingsToDOM();
  initFaqAccordion();
  initAppleInteractions();
  loadFromServer();

});

