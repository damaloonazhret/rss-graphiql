import Denis from '../../assets/membersPhotos/Denis.jpg';
import Evgeniy from '../../assets/membersPhotos/Evgeniy.jpg';
import Andrey from '../../assets/membersPhotos/Andrey.jpg';
import { useContext } from 'react';
import { LanguageContext } from '../../context/localization.tsx';
import style from './welcomePage.module.scss';

const About = () => {
  const { languageData } = useContext(LanguageContext);
  return (
    <>
      <h1 className={style.welcomeInfo}>{languageData.welcome}</h1>
      <div className={style.info}>
        <p className={style.card}>{languageData.aboutProject}</p>
        <div className={style.welcome}>
          <section className={style.card}>
            <article>
              <figure>
                <a href="https://github.com/denys-bilonozhko/" target="_blank">
                  <img className={style.image} src={Denis} alt={languageData.altPhoto} />
                </a>
                <img />
                <figcaption>
                  <span className={style.memberName}>{languageData.Denis}</span>
                </figcaption>
              </figure>
              <p>{languageData.DenisInfo}</p>
            </article>
          </section>
          <section className={style.card}>
            <article>
              <figure>
                <a href="https://github.com/p0lluxstar/" target="_blank">
                  <img className={style.image} src={Evgeniy} alt={languageData.altPhoto} />
                </a>
                <img />
                <figcaption>
                  <span className={style.memberName}>{languageData.Evgeniy}</span>
                </figcaption>
              </figure>
              <p>{languageData.EvgeniyInfo}</p>
            </article>
          </section>
          <section className={style.card}>
            <article>
              <figure>
                <a href="https://github.com/damaloonazhret/" target="_blank">
                  <img className={style.image} src={Andrey} alt={languageData.altPhoto} />
                </a>
                <img />
                <figcaption>
                  <span className={style.memberName}>{languageData.Andrey}</span>
                </figcaption>
              </figure>
              <p>{languageData.AndreyInfo}</p>
            </article>
          </section>
        </div>
        <p className={style.card}>
          {languageData.aboutCourse}
          <a className={style.linkToCourse} href="https://rs.school/" target="_blank">
            {languageData.linkToCourse}
          </a>
        </p>
      </div>
    </>
  );
};

export default About;
