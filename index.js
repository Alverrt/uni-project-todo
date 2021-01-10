const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))

const authenticate = (body) => {
  const username = body.username;
  const password = body.password;

  if (username !== 'ahmet' && username !== 'mehmet' && username !== 'zeynep') {
    return false;
  }

  switch (username) {
    case 'ahmet':
      if (password === 'ahmet123') {
        return true;
      }
      break;
    case 'mehmet':
      if (password === 'mehmet123') {
        return true;
      }
      break;
    case 'zeynep':
      if (password === 'zeynep123') {
        return true;
      }
      break;

    default:
      return false;
      break;
  }
}

const ahmetGorevleri = [
  {
    user: 'Ahmet',
    gorevID: '#432',
    gorevKategori: 'Analiz',
    baslik: 'Backend\'de Bug Analizi',
    aciklama: 'Sunucunun backend tarafındaki buglarının anazlizinin yapılması.',
    gorevBaslangic: new Date(2021, 01, 01).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
    user: 'Ahmet',
    gorevID: '#456',
    gorevKategori: 'Geliştirme',
    baslik: 'Grafik Arayüzünün Geliştirilmesi',
    aciklama: 'Kullanıcıya bakan UI tarafının yeni trendlere uygun olarak yeniden geliştirilmesi.',
    gorevBaslangic: new Date(2021, 01, 02).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 10).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  }
]

const mehmetGorevleri = [
  {
    user: 'Mehmet',
    gorevID: '#443',
    gorevKategori: 'Analiz',
    baslik: 'Mobil Arayüz Analizi',
    aciklama: 'Mobil arayüzdeki responsive olmayan kısımların analizi ve rapor edilmesi.',
    gorevBaslangic: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 09).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
    user: 'Mehmet',
    gorevID: '#466',
    gorevKategori: 'Analiz',
    baslik: 'Raporlanan Bugların Düzeltilmesi',
    aciklama: 'Mobil arayüzündeki daha önce raporlanan buglara çözüm üretilmesi.',
    gorevBaslangic: new Date(2021, 01, 02).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 14).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  }
]

const zeynepGorevleri = [
  {
    user: 'Zeynep',
    gorevID: '#410',
    gorevKategori: 'Test',
    baslik: 'Mobil UI Testleri',
    aciklama: 'Mobil tarafında yapılan geliştirmelerin ve bug fixlerinin automation toolları kullanılarak test edilmesi.',
    gorevBaslangic: new Date(2021, 01, 01).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
    user: 'Zeynep',
    gorevID: '#498',
    gorevKategori: 'Test',
    baslik: 'Backend Yük Testi',
    aciklama: 'Backend tarafında yapılan geliştirmelerin ne kadar kapasitesi olduğunun test edilmesi.',
    gorevBaslangic: new Date(2021, 01, 02).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 10).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  }
]

const gorevler = (kullanici) => {
  switch (kullanici) {
    case 'ahmet':
      return ahmetGorevleri;
      break;
    case 'mehmet':
      return mehmetGorevleri;
      break;
    case 'zeynep':
      return zeynepGorevleri;
      break;

    default:
      throw new Error('Kullanici adi alinamadi.');
      break;
  }
}

function updateStatus(username, status, gorevID) {
  switch (username) {
    case "Ahmet":
      ahmetGorevleri.forEach((element) => {
        if (element.gorevID === gorevID) {
          element.gorevDurumu = status
        }
      })
      break;
    case "Mehmet":
      mehmetGorevleri.forEach((element) => {
        if (element.gorevID === gorevID) {
          element.gorevDurumu = status
        }
      })
      break;
    case "Zeynep":
      zeynepGorevleri.forEach((element) => {
        if (element.gorevID === gorevID) {
          element.gorevDurumu = status
        }
      })
      break;

    default:
      break;
  }
}

const getRandomID = (min = 200, max = 900) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gorevEkle = (session, gorev) => {
  switch (session) {
    case 'Ahmet':
      ahmetGorevleri.push(
        {
          user: session,
          gorevID: '#' + getRandomID(),
          gorevKategori: gorev.kategori,
          baslik: gorev.baslik,
          aciklama: gorev.aciklama,
          gorevBaslangic: gorev.baslangic,
          gorevBitis: gorev.bitis,
          gorevDurumu: gorev.durum
        }
      )
      break;
    case 'Mehmet':
      mehmetGorevleri.push(
        {
          user: session,
          gorevID: '#' + getRandomID(),
          gorevKategori: gorev.kategori,
          baslik: gorev.baslik,
          aciklama: gorev.aciklama,
          gorevBaslangic: gorev.baslangic,
          gorevBitis: gorev.bitis,
          gorevDurumu: gorev.durum
        }
      )
      break;
    case 'Zeynep':
      zeynepGorevleri.push(
        {
          user: session,
          gorevID: '#' + getRandomID(),
          gorevKategori: gorev.kategori,
          baslik: gorev.baslik,
          aciklama: gorev.aciklama,
          gorevBaslangic: gorev.baslangic,
          gorevBitis: gorev.bitis,
          gorevDurumu: gorev.durum
        }
      )
      break;

    default:
      break;
  }
}

// Tarih htmlin kendi datepickerinden alınıyor. Ama html tarihi tr standartlarına göre almıyor. Onu fixleyen fonksiyon.
const fixDate = (date) => {
  let dateArray = date.split('-')
  dateArray.reverse()
  let fixedDate = dateArray.join('.')
  return fixedDate
}

const session = []

app.get('/', (req, res) => {
  session.pop()
  res.render('index', {isError: false})
})

app.post('/login', function (req, res) {
  if (authenticate(req.body)) {
    const gorevJSON = gorevler(req.body.username)
    session.pop()
    session.push(gorevJSON[0].user)
    res.redirect('/dashboard');
  } else {
    res.render('index', {isError: true})
  }
})
app.post('/update', function (req, res) {
  updateStatus(session[0], req.body.status, req.body.gorevID)
})

app.post('/gorevekle', (req, res) => {
  req.body.baslangic = fixDate(req.body.baslangic)
  req.body.bitis = fixDate(req.body.bitis)
  gorevEkle(session[0], req.body)
  res.redirect('/dashboard');
})

app.get('/dashboard', (req, res) => {
  let lowercase = session[0].toLowerCase()
  let gorevJSON = gorevler(lowercase)
  res.render('./gorevlerim/index.ejs', { gorevJSON })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
