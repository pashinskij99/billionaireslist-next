/** @format */

import React, { useEffect, useState } from "react";
import Story from "../../components/about/Story";
import Meta from "../../components/Meta";
import NewseLatter2 from "../../components/dao/newseLatter2";
import HeadLine from "../../components/headLine";
import { DefaultService } from "../../services/default.service";
import Loader from "../../components/preloader/Loader";
import {
  netWorthFormat,
  thousandToK,
  thousandToKQuotes,
} from "../../utils/formatNumber";

const About = () => {
  const [video, setVideo] = useState(false);
  const [general, setGeneral] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const { data } = await DefaultService.getStatistics();

      setGeneral(data);
    };

    fetchStatistics();
  }, []);

  return (
    <>
      <Meta
        title="About Billionaires List"
        desc={
          "Billionaireslist.com is the ultimate resource for celebrity net worth and success stories. Our online marketing agency leverages media and big data for unparalleled analysis."
        }
      />

      {!general.length ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <ContentPage general={general} video={video} setVideo={setVideo} />
      )}
    </>
  );
};

const ContentPage = ({ video, setVideo, general }) => (
  <>
    {/* <!-- Page title --> */}
    <section className="relative pt-24">
      <div className="container">
        {/* <!-- Page Title --> */}
        <div className="mx-auto max-w-2xl py-12 md:py-16 text-center">
          <HeadLine
            text="About Us"
            classes="font-display mb-4 text-center text-6xl animate-gradient"
          />
        </div>
      </div>
      <Story compFor="about" />
    </section>
    {/* <!-- Intro / Statistics --> */}

    <section className="py-12 md:py-24">
      <div className="container">

        {/* <!-- Statistics --> */}
        <div>
          <h2 className="font-display text-jacarta-700 mb-16 text-center text-3xl dark:text-white">
            Numbers Speak
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-3">
            <div className="mb-10 text-center">
              <span className="font-display text-jacarta-700 block text-5xl dark:text-white">
                {thousandToK(general[0]?.celebrity_count)}
              </span>
              <span className="dark:text-jacarta-300 block">Celebrities</span>
            </div>
            <div className="mb-10 text-center">
              <span className="font-display text-jacarta-700 block text-5xl dark:text-white">
                {thousandToKQuotes(general[0]?.quotes)}
              </span>
              <span className="dark:text-jacarta-300 block">Quotes</span>
            </div>
            <div className="mb-10 text-center">
              <span className="font-display text-jacarta-700 block text-5xl dark:text-white">
                {netWorthFormat(general[0]?.net_worth_total)}
              </span>
              <span className="dark:text-jacarta-300 block">
                Combined Wealth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      className={
        video ? "modal lightbox fade show" : "modal lightbox fade hidden"
      }
    >
      <div className="modal-dialog modal-dialog-centered modal-xl w-full">
        <div className="modal-content border-0 bg-transparent">
          <div className="modal-body p-0 relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 p-3"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ zIndex: "2", background: "none" }}
              onClick={() => setVideo(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "relative", top: "-5px" }}
                viewBox="0 0 16 16"
                fill="#fff"
              >
                <path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>

            <div
              id="lightboxCarousel-d7ewe4ig"
              className="lightbox-carousel carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  style={{ minHeight: "100px" }}
                >
                  <div className="position-absolute top-50 start-50 translate-middle text-white">
                    <div
                      className="spinner-border"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    ></div>
                  </div>
                  <div
                    className="ratio ratio-16x9"
                    style={{ backgroundColor: "#000" }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="YouTube video player"
                      // frameborder="0"
                      allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                      // allowfullscreen=""
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <EmailForm /> */}
    <NewseLatter2 bgWhite={false} />
  </>
);

export default About;
