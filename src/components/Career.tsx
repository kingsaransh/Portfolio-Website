import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary & Senior Secondary</h4>
                <h5>Holy Cross School, Laksar</h5>
              </div>
              <h3>2021-23</h3>
            </div>
            <p>
              Class 12 (Science Stream, 78%) and Class 10 (89%). Developed deep analytical skills and strong fundamentals in science and mathematics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in AI & Machine Learning</h4>
                <h5>COER University, Roorkee</h5>
              </div>
              <h3>2023-27</h3>
            </div>
            <p>
              Pursuing B.Tech in AI & ML (CGPA: 7.5). Authored research paper on Carbon Emission management (Eco-Barrier) with high CO2-absorbing vertical plantations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Artificial Intelligence Intern</h4>
                <h5>CODE ALPHA (Remote)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developed practical AI/ML solutions in Python. Applied data preprocessing, feature engineering, and predictive modeling using NumPy, Pandas, and Scikit-learn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
