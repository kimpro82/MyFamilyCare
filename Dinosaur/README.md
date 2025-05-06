# [Dinosaur](/README.md#dinosaur)

For my son


### \<List>

- [Major Universities for Dinosaur Research (2025.05.06)](#major-universities-for-dinosaur-research-20250506)
- [Brachiosaurus (2024.11.22)](#brachiosaurus-20241122)


## [Major Universities for Dinosaur Research (2025.05.06)](#list)

- Answered by *Perplexity.ai* (not 100% accuracy guaranteed)

- Global
  | 대학명 | 주요 학과/프로그램 | 특징 |
  | --- | --- | --- |
  | Harvard University (미국) | Earth and Planetary Sciences | 세계적 고생물학 연구, 방대한 화석 컬렉션, 엄격한 커리큘럼 |
  | Stanford University (미국) | Geological Sciences | 고생물학 및 지질학 융합 연구 |
  | University of California, Berkeley (미국) | Integrative Biology, Earth and Planetary Science | UCMP(캘리포니아 고생물학 박물관) 소속, 실습 중심 교육 |
  | University of Chicago (미국) | Organismal Biology and Anatomy, Geophysical Sciences | 척추고생물학, 맞춤형 대학원 과정, 최신 연구시설 |
  | Yale University (미국) | Geology & Geophysics | 5백만 점 이상의 화석 소장, 다양한 연구 주제 |
  | University of Michigan, Ann Arbor (미국) | Earth and Environmental Sciences | 학부·대학원 고생물학 과정, 현장 실습 |
  | University of Oxford (영국) | Earth Sciences | 유럽 내 고생물학 연구 중심지 |
  | University of Cambridge (영국) | Earth Sciences | 고생물학 및 지질학 연구 전통 |
  | University of Toronto (캐나다) | Earth Sciences | 북미 대표 고생물학 연구 |
  | University of Alberta (캐나다) | Biological Sciences | 온라인 고생물학 과정 제공, 세계적 연구진 |
  | University of Tokyo (일본) | Earth and Planetary Science | 아시아 대표 고생물학 연구 |

- Korea
  | 대학명 | 학과/연구기관 | 주요 연구/특징 |
  | --- | --- | --- |
  | 서울대학교 | 지구환경과학부 | 이융남 교수 등 국내 대표 공룡학자 재직, 척추고생물학 및 공룡 연구, 국제적 연구성과 보유|
  | 전남대학교 | 지질학과, 한국공룡연구센터 | 국내 최대 공룡 전문 연구기관, 코리아노사우루스 등 신종 공룡 연구·발굴, 공룡알·발자국 등 다양한 화석 연구 |
  | 강원대학교 | 지질학과 | 미고생물학 및 척추고생물학 연구, 공룡 등 고생물 연구 교수 재직 |
  | 충북대학교 | 지질학과 | 미고생물학 연구, 고생물 화석 연구 교수 재직 |
  | 충남대학교 | 지질학과 | 미고생물학 연구, 고생물학 교수 재직 |
  | 공주대학교 | 지질환경과학과 | 미고생물학 연구, 고생물학 교수 재직 |
  | 전북대학교 | 지질학과 | 미고생물학 연구, 고생물학 교수 재직 |

- References
  - [Best Universities for Paleontology in the World (EduRank, 2025.03.25)](https://edurank.org/biology/paleontology/)
  - [Best Colleges for Students Interested in Dinosaurs (Paleontology) (CollegeRaptor, 2022.12.22)](https://www.collegeraptor.com/find-colleges/articles/college-comparisons/colleges-students-interested-dinosaurs-paleontology/)
  - [지층에 숨겨진 보물 (서울대 소식, 2016.09.01)](https://www.snu.ac.kr/snunow/snu_story?md=v&bbsidx=123444)
  - [세계 최초 한국 이름 딴 공룡 탄생 (남도일보, 2010.11.02)](http://www.namdonews.com/news/articleView.html?idxno=272582)
  - [Re: 척추고생물학을 전공하려면... (KoreEArth NET, 2001.05.20)](http://korearth.net/bbs/board.php?bo_table=qna&wr_id=256)


## [Brachiosaurus (2024.11.22)](#list)

- My son really loves it

  ![Brachiosaurus](./Images/brachiosaurus.gif)

- Future improvements
  - Add sound effects
  - Add background
- Code
  <details>
    <summary>brachiosaurus.html</summary>

    ```html
    <!DOCTYPE html>

    <html lang="en">

    <head>
        ……
        <title>Brachiosaurus for My Son</title>
        <link rel="stylesheet" href="brachiosaurus.css">
        <script defer src="brachiosaurus.js" type="module"></script>
    </head>

    <body>
        <h1>Brachiosaurus</h1>
        <div class="container">
            <object id="brachio-svg" data="brachiosaurus.svg" type="image/svg+xml"></object>
        </div>
    </body>

    </html>
    ```
  </details>
  <details>
    <summary>brachiosaurus.svg</summary>

    ```svg
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
        <rect id="head" x="70" y="20" width="40" height="30" fill="green"/>
        <circle id="eye" cx="100" cy="30" r="5" fill="#000000"/>
        <rect id="neck" x="90" y="40" width="20" height="70" fill="green"/>

        <rect id="body" x="90" y="100" width="130" height="30" fill="green"/>
        <polygon id="tail" points="219,100 219,120 280,130" fill="green"/>

        <rect id="leg1" x="90" y="120" width="20" height="50" fill="green"/>
        <rect id="leg2" x="120" y="120" width="20" height="50" fill="green"/>
        <rect id="leg3" x="170" y="120" width="20" height="50" fill="green"/>
        <rect id="leg4" x="200" y="120" width="20" height="50" fill="green"/>
    </svg>
    ```
  </details>
  <details>
    <summary>brachiosaurus.css</summary>

    ```css
    body {
        margin: 0;
        overflow: hidden;
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
    }

    #brachio-svg {
        width: 80%;
        height: auto;
        animation: move 5s ease-in infinite;
    }

    @keyframes move {
        from { transform: translateX(105%); }
        to { transform: translateX(-105%); }
    }
    ```
  </details>
  <details>
    <summary>brachiosaurus.ts</summary>

    ```ts
    // Constant for the object ID
    const SVG_OBJECT_ID = 'brachio-svg';

    // Constants for SVG element IDs
    const LEG1_ID = 'leg1';
    const LEG2_ID = 'leg2';
    const LEG3_ID = 'leg3';
    const LEG4_ID = 'leg4';
    const HEAD_ID = 'head';
    const EYE_ID = 'eye';
    const NECK_ID = 'neck';
    ```
    ```ts
    document.addEventListener('DOMContentLoaded', () => {
        const svgObject = document.getElementById(SVG_OBJECT_ID) as HTMLObjectElement;

        svgObject.addEventListener('load', () => {
            const svgDoc = svgObject.contentDocument;
            if (svgDoc) {
                // Call functions to handle animations
                animateLegs(svgDoc);
                animateHeadNeck(svgDoc);
            }
        });
    });
    ```
    ```ts
    /**
     * Animates the legs of the Brachiosaurus.
     * @param svgDoc The SVG document containing the elements.
     */
    function animateLegs(svgDoc: Document): void {
        const leg1 = svgDoc.getElementById(LEG1_ID);
        const leg2 = svgDoc.getElementById(LEG2_ID);
        const leg3 = svgDoc.getElementById(LEG3_ID);
        const leg4 = svgDoc.getElementById(LEG4_ID);

        if (leg1 && leg2 && leg3 && leg4) {
            // Animate leg1 and leg3 simultaneously
            [leg1, leg3].forEach((leg) => {
                leg.animate(
                    [
                        { transform: 'translateX(0)' },     // Original position
                        { transform: 'translateX(1.5%)' },  // Move slightly right
                        { transform: 'translateX(0)' }      // Return to original position
                    ],
                    {
                        duration: 1000,                     // Animation duration in milliseconds
                        iterations: Infinity,               // Infinite loop
                        easing: 'ease-in-out'               // Smooth movement
                    }
                );
            });

            // Animate leg2 and leg4 simultaneously (opposite timing)
            [leg2, leg4].forEach((leg) => {
                leg.animate(
                    [
                        { transform: 'translateX(0)' },     // Original position
                        { transform: 'translateX(-1.5%)' }, // Move slightly left
                        { transform: 'translateX(0)' }      // Return to original position
                    ],
                    {
                        duration: 1000,                     // Animation duration in milliseconds
                        iterations: Infinity,               // Infinite loop
                        easing: 'ease-in-out'               // Smooth movement,
                    }
                );
            });
        }
    }
    ```
    ```ts
    /**
     * Animates the head, eye, and neck of the Brachiosaurus.
     * @param svgDoc The SVG document containing the elements.
     */
    function animateHeadNeck(svgDoc: Document): void {
        const head = svgDoc.getElementById(HEAD_ID);
        const eye = svgDoc.getElementById(EYE_ID);
        const neck = svgDoc.getElementById(NECK_ID);

        if (head && eye && neck) {
            [head, eye, neck].forEach((element) => {
                element.animate(
                    [
                        { transform: 'translateY(0)' },     // Original position
                        { transform: 'translateY(3%)' },    // Move downward by 3%
                        { transform: 'translateY(0)' }      // Return to original position
                    ],
                    {
                        duration: 1000,                     // Animation duration in milliseconds
                        iterations: Infinity,               // Infinite loop
                        easing: 'ease-in-out'               // Smooth movement
                    }
                );
            });
        }
    }
    ```
  </details>
