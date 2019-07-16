import React from "react";
import demo1 from "../../image/login.png";
import demo2 from "../../image/all.png";
import demo3 from "../../image/description.png";
import demo4 from "../../image/graph.png";
import "./Homepage.css";

const Homepage = ({ history }) => {
  return (
    <footer className="container">
      <section className="hero">
        <div className="hero__text-box">
          <h1 className="hero-title">Manehabi</h1>
          <h3 className="hero-subtitle">新しい習慣継続の手助けします</h3>
          <div className="btn-group">
            <button
              onClick={() => history.push("/habits")}
              className="btn-primary"
            >
              皆の習慣を見てみる
              <i className="right arrow icon" />
            </button>

            <button
              onClick={() => history.push("/signup")}
              className="btn-primary"
            >
              会員登録
              <i className="right arrow icon" />
            </button>
          </div>
        </div>
      </section>
      <div>
        <section className="feature-section">
          <div className="feature-textbox">
            <h2 className="feature-heading">新しい習慣管理機能</h2>
            <h3 className="feature-subheading mb-2">
              習慣を初めてもすぐ挫折してしまうあなたへ。Manehabiは今までにない機能を備えています。
            </h3>
          </div>
          <div className="feature-cards">
            <div className="feature-card">
              <i className=" users icon icon-item" />
              <h2 className="feature-card__heading">全習慣Check</h2>
              <p className="feature-card__subheading">
                世の中には同じように習慣を続けようと頑張っている人がたくさんいます。
                色んな人の習慣をチェックしてモチベを高めよう！
              </p>
            </div>
            <div className="feature-card">
              <i className="chart bar icon icon-item" />
              <h2 className="feature-card__heading">グラフで可視化</h2>
              <p className="feature-card__subheading">
                習慣を始めたその日からあらゆる単位であなたの習慣を可視化します。
                例えば筋トレなら回数や時間を単位にしておけるし、ブログなら文字数や時間なんかによる複数管理もできちゃう。
              </p>
            </div>
            <div className="feature-card">
              <i className=" search icon icon-item" />
              <h2 className="feature-card__heading">習慣検索機能</h2>
              <p className="feature-card__subheading">
                あなたと似たような習慣をやっている人を探して高め合うこともできるよ。
                もしくは、新しい習慣を探す役に立つかも？？？
              </p>
            </div>
            <div className="feature-card">
              <i className="star icon icon-item" />
              <h2 className="feature-card__heading">お気に入り登録</h2>
              <p className="feature-card__subheading">
                もちろんあなたが興味を引いた習慣はワンクリックでいつでもお気に入りに追加できるよ。
                注目している人の習慣をいつでもチェックだ！
              </p>
            </div>
          </div>
        </section>
        <section className="step-section">
          <div className="text-box">
            <h2 className="step-heading">Manehabiを始めるには？</h2>
            <h3 className="step-subheading mb-2">
              簡単３ステップであなたも今日から習慣を記録できるよ！
            </h3>
          </div>
          <div className="steps">
            <div className="box-wrap">
              <div className="steps__step-box">
                <h3 className="steps__step-num">
                  Step<span>1</span>
                </h3>
                <h4 className="steps__step-title">会員登録</h4>
                <p className="steps__step-para">
                  Twitterお持ちの方はすぐログインできます！
                </p>
              </div>
            </div>
            <div className="box-wrap">
              <div className="steps__step-box">
                <h3 className="steps__step-num">
                  Step<span>2</span>
                </h3>
                <h4 className="steps__step-title">習慣の登録</h4>
                <p className="steps__step-para">始めたい習慣を登録しよう!</p>
              </div>
            </div>
            <div className="box-wrap">
              <div className="steps__step-box">
                <h3 className="steps__step-num">
                  Step<span>3</span>
                </h3>
                <h4 className="steps__step-title">習慣の更新</h4>
                <p className="steps__step-para">
                  習慣を決めたら早速更新しよう！
                </p>
              </div>
            </div>
          </div>
          <div className="step-btn-group">
            <button
              onClick={() => history.push("/habits")}
              className="btn-primary"
            >
              皆の習慣を見てみる
              <i className="right arrow icon" />
            </button>

            <button
              onClick={() => history.push("/signup")}
              className="btn-primary"
            >
              会員登録
              <i className="right arrow icon" />
            </button>
          </div>
        </section>
      </div>

      <section className="demo-section">
        <div className="text-box">
          <h2 className="step-heading">デモコーナー</h2>
          <h3 className="step-subheading mb-2">
            ここでは簡単に主要画面の紹介をしています！
          </h3>
        </div>
        <div className="demos">
          <div className="demo-box">
            <h3 className="demo-title">会員登録画面</h3>
            <img src={demo1} alt="aaa" className="demo-image" />
            <p className="demo-para">
              まずはここから会員登録をしよう！みんなの習慣は会員登録しなくても見ることができるよ！
              Twitterからでも簡単にログインができるのでささっとすませてしまおう！
            </p>
          </div>
          <div className="demo-box">
            <h3 className="demo-title">全習慣確認画面</h3>
            <img src={demo2} alt="aaa" className="demo-image" />
            <p className="demo-para">
              この画面は誰でも見ることができるよ！
              登録した習慣は全てここの一覧に乗るので検索したい習慣があったら検索をかけてみよう！
            </p>
          </div>
          <div className="demo-box">
            <h3 className="demo-title">習慣詳細画面</h3>
            <img src={demo3} alt="aaa" className="demo-image" />
            <p className="demo-para">
              ここでは一つの習慣をより詳細に確認することができるよ！
              どのぐらい継続しているか、どのくらいみんなからお気に入り登録しているか、ありとあらゆる情報をチェックだ！
            </p>
          </div>
          <div className="demo-box">
            <h3 className="demo-title">積み上げグラフとコメント欄</h3>
            <img src={demo4} alt="aaa" className="demo-image" />
            <p className="demo-para">
              お待ちかねの積み上げグラフ。現在は過去3ヶ月分まで遡って見ることができるよ！必要に応じて調整してみてね！
              そしてみんなから一言をもらったり、自分のその日の簡単なまとめなどをしておくコメント欄もあるよ！
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h3 className="footer__top">This sites made by kaleido01.</h3>
        <ul class="footer__list">
          <li class="footer__item">
            <a
              href="https://kaleido01.com/description-manehabi/"
              class="footer__link"
            >
              Blog
            </a>
          </li>
          <li class="footer__item">
            <a
              href="https://qiita.com/mbdkaleido/items/c3ef73e42dfd758a334f"
              class="footer__link"
            >
              Qiita
            </a>
          </li>
          <li class="footer__item">
            <a href="https://twitter.com/kaleido0101" class="footer__link">
              Twitter
            </a>
          </li>
          <li class="footer__item">
            <a href="#" class="footer__link">
              Privacy policy
            </a>
          </li>
        </ul>
        <div className="hope">
          <p className="hope__text">
            このサイトはよりよく習慣を管理するために作られました。
          </p>
          <p className="hope__text">
            みなさんがこのアプリを使って少しでも長く習慣が続くことを祈っています。
          </p>
          <p className="hope__copyright">
            {" "}
            Copyright © kaleido01 2019/06～2019 All Rights Reserved
          </p>
        </div>
      </footer>
    </footer>
  );
};

export default Homepage;
