export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Єдина цифрова платформа потреб громад
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Єдиний електронний майданчик для прозорого розміщення потреб громад 
          та ефективного залучення донорської й інвестиційної підтримки.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <button className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-500">
            Переглянути потреби
          </button>
          <button className="border border-green-500 px-6 py-3 rounded-xl hover:bg-green-500 hover:text-black">
            Стати партнером
          </button>
        </div>
      </section>

      {/* МЕТА */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-green-400">Мета проєкту</h2>
        <p className="text-lg text-gray-300">
          Створення єдиного електронного майданчика для централізованого збору,
          верифікації та публікації потреб територіальних громад області з метою
          ефективної взаємодії з міжнародними партнерами та донорами.
        </p>
      </section>

      {/* ПЕРЕВАГИ */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-green-400">Переваги</h2>
          <ul className="space-y-4 text-lg text-gray-300">
            <li>→ Централізований збір і моніторинг потреб</li>
            <li>→ Усунення дублювання та пріоритезація</li>
            <li>→ Автоматизований принцип «потреба — донор»</li>
            <li>→ Єдина точка входу для міжнародних партнерів</li>
            <li>→ Формування позитивного іміджу області</li>
          </ul>
        </div>
      </section>

      {/* ЯК ЦЕ ПРАЦЮЄ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-green-400 text-center">
          Як це працює
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-bold mb-2">1</h3>
            <p>Громада подає потребу</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">2</h3>
            <p>ОВА проводить верифікацію</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">3</h3>
            <p>Публікація в каталозі</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">4</h3>
            <p>Донор обирає та закриває потребу</p>
          </div>
        </div>
      </section>

      {/* ДЕМО КАТАЛОГ */}
      <section className="py-20 px-6 bg-gray-800">
        <h2 className="text-3xl font-semibold mb-12 text-green-400 text-center">
          Приклад потреб
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-bold mb-2">Генератор 15 кВт</h3>
            <p className="text-gray-400">Бюджет: 70 000 грн</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-bold mb-2">Ноутбуки для ЦНАП</h3>
            <p className="text-gray-400">Бюджет: 50 000 грн</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-bold mb-2">Сонячна панель</h3>
            <p className="text-gray-400">Бюджет: 100 000 грн</p>
          </div>
        </div>
      </section>

      {/* КОНТАКТИ */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-green-400">
          Контакти
        </h2>
        <p className="text-gray-300">
          Департамент цифрової трансформації Харківської ОВА
        </p>
        <p className="text-gray-300">info@kharkiv-digital.gov.ua</p>
      </section>

    </main>
  );
}