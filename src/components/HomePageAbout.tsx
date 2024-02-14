/* eslint-disable max-len */
import './HomePageAbout.scss';

export const HomePageAbout = () => {
  return (
    <div className="home-page-about">
      <div className="home-page-about__container">
        <div className="home-page-about__image-box">
          <img
            src="./img/about-big-hearts.jpg"
            className="home-page-about__image"
            alt="Благодійний проект Великі серця"
          />

          <div className="home-page-about__image-text">
            Допомога сьогодні,
            <br />
            Допомога завтра!
          </div>
        </div>

        <div className="home-page-about__content">
          <div className="home-page-about__sub-title">
            проста та безпечна допомога
          </div>

          <div className="home-page-about__title">
            Благодійний проект
            <br />
            Великі Серця
          </div>

          <p className="home-page-about__text">
            Ми віримо в силу добрих справ і об&apos;єднуємо людей з різних куточків України, які готові віддати свій час і зусилля для підтримки тих, хто цього найбільше потребує. Наша мета - створити зручну платформу, де кожен може знайти можливість волонтерити, надаючи різноманітні послуги та підтримку для українців. А ті, хто опинився у скрутній ситуації, хай відчують і переконаються, що вони не самотні.
          </p>

          <p className="home-page-about__text">
            Ми віримо, що кожен внесок має значення і може змінити чиєсь життя на краще. Незалежно від того, чи ви готові надати професійні послуги, підтримати матеріально, чи просто підтримати словом - тут є місце для кожного. Разом ми можемо зробити більше!
          </p>
        </div>
      </div>
    </div>
  );
};
