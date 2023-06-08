import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-page-main-div">
        <nav>
          <h1>PiggyBank</h1>
          <button onClick={() => navigate("/login")}>Log In</button>
        </nav>
        <div>
          <div>
            <h2>Financial literacy is important. Spend. Save. Learn.</h2>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
      </div>

      <div className="landing-w-parent-div">
        <div className="landing-page-who-where-when-div">
          <div>
            <img src="/images/greendollar.jpg" />
          </div>
          <div>
            <h2>Who, When, Where</h2>
            <h5>The Inspiration</h5>
            <p>
              Hi, I'm Dana Lobell and I'm a full stack software engineer based
              in NYC. Last summer on my way to coding bootcamp, I overheard a
              mom talking to her daughter about where she's going for summer
              camp:
              <br />
              Mom - "You're going to finance camp this summer."
              <br />
              Daughter - "Why?"
              <br />
              Mom - "So that you're never dependent on another person for
              money."
            </p>
          </div>
        </div>
        <div className="squiggle-div">
          <img src="/images/squiggle3.png" />
          <img src="/images/squiggle4.png" />
        </div>
        <div className="landing-page-who-where-when-div">
          <div>
            <h2>Why, What</h2>
            <h5>The Idea</h5>
            <p>
              The conversation got me thinking;
              <br />
              How do we ensure that all children have the opportunity to gain
              valuable skills in financial literacy? How can we make access to
              education available for children who don't go to, or don't want to
              go to finance camp?
              <br />
              Introducing PiggyBank, an app for children to use to track their
              spending!
              <br />
              PiggyBank's purpose is to introduce children to the idea of how to
              balance spending on wants and needs, and how to save in the
              process. The app is an exposure to the world of managing finances,
              without being overwhelming to young children.
            </p>
          </div>
          <div>
            <img src="/images/bank.jpg" />
          </div>
        </div>
      </div>

      <div className="landing-signup-div">
        <h2>Sign up and start saving today!</h2>
        <img src="/images/pinksignupblob.png" />
      </div>

      <div>
      <footer>
        <p>Hey, you! Like what you see? Check out my other projects <a href="https://danalobell.dev/" target="_blank">here!</a></p>
      </footer>
      </div>
    </>
  );
}
