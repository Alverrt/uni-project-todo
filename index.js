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
    gorevID: '#432',
    gorevKategori: 'Analiz',
    baslik: 'Backend\'de Bug Analizi',
    aciklama: 'Sunucunun backend tarafındaki buglarının anazlizinin yapılması.',
    gorevBaslangic: new Date(2021, 01, 01).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
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
    gorevID: '#443',
    gorevKategori: 'Analiz',
    baslik: 'Mobil Arayüz Analizi',
    aciklama: 'Mobil arayüzdeki responsive olmayan kısımların analizi ve rapor edilmesi.',
    gorevBaslangic: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 09).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
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
    gorevID: '#410',
    gorevKategori: 'Test',
    baslik: 'Mobil UI Testleri',
    aciklama: 'Mobil tarafında yapılan geliştirmelerin ve bug fixlerinin automation toolları kullanılarak test edilmesi.',
    gorevBaslangic: new Date(2021, 01, 01).toLocaleDateString('tr'),
    gorevBitis: new Date(2021, 01, 03).toLocaleDateString('tr'),
    gorevDurumu: 'bekleyen'
  },
  {
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

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', function (req, res) {
  if (authenticate(req.body)) {
    const gorevJSON = gorevler(req.body.username)
    res.render('./gorevlerim/index.ejs',{ gorevJSON })
  } else {
    res.send('noluoz yanlis girdin')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
