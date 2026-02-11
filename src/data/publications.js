export const publications = [
  {
    title: "Opening the Sim-to-Real Door for Humanoid Pixel-to-Action Policy Transfer",
    authors: "Haoru Xue*, Tairan He*, Zi Wang*, Qingwei Ben, Wenli Xiao, Zhengyi Luo, Xingye Da, Fernando Castañeda, Guanya Shi, Shankar Sastry, Linxi \"Jim\" Fan†, Yuke Zhu†",
    year: "2025",
    link: "https://doorman-humanoid.github.io/",
    webpage: "https://doorman-humanoid.github.io/",
    pdf: "https://arxiv.org/abs/2512.01061",
    arxiv: "https://arxiv.org/abs/2512.01061",
    abstract: "Recent progress in GPU-accelerated, photorealistic simulation has opened a scalable data-generation path for robot learning, where massive physics and visual randomization allow policies to generalize beyond curated environments. Building on these advances, we develop a teacher-student-bootstrap learning framework for vision-based humanoid loco-manipulation, using articulated-object interaction as a representative high-difficulty benchmark. Our approach introduces a staged-reset exploration strategy that stabilizes long-horizon privileged-policy training, and a GRPO-based fine-tuning procedure that mitigates partial observability and improves closed-loop consistency in sim-to-real RL. Trained entirely on simulation data, the resulting policy achieves robust zero-shot performance across diverse door types and outperforms human teleoperators by up to 31.7% in task completion time under the same whole-body control stack. This represents the first humanoid sim-to-real policy capable of diverse articulated loco-manipulation using pure RGB perception.",
    bibtex: `@article{xue2025openingsimtorealdoorhumanoid,
  title={Opening the Sim-to-Real Door for Humanoid Pixel-to-Action Policy Transfer},
  author={Haoru Xue and Tairan He and Zi Wang and Qingwei Ben and Wenli Xiao and Zhengyi Luo and Xingye Da and Fernando Castañeda and Guanya Shi and Shankar Sastry and Linxi "Jim" Fan and Yuke Zhu},
  year={2025},
  eprint={2512.01061},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2512.01061}
}`
  },
  {
    title: "VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation",
    authors: "Tairan He*, Zi Wang*, Haoru Xue*, Qingwei Ben*, Zhengyi Luo, Wenli Xiao, Ye Yuan, Xingye Da, Fernando Castañeda, Shankar Sastry, Changliu Liu, Guanya Shi, Linxi \"Jim\" Fan†, Yuke Zhu†",
    year: "2025",
    link: "https://viral-humanoid.github.io/",
    webpage: "https://viral-humanoid.github.io/",
    pdf: "https://arxiv.org/abs/2511.15200",
    arxiv: "https://arxiv.org/abs/2511.15200",
    abstract: "A key barrier to the real-world deployment of humanoid robots is the lack of autonomous loco-manipulation skills. We introduce VIRAL, a visual sim-to-real framework that learns humanoid loco-manipulation entirely in simulation and deploys it zero-shot to real hardware. VIRAL follows a teacher-student design: a privileged RL teacher, operating on full state, learns long-horizon loco-manipulation using a delta action space and reference state initialization. A vision-based student policy is then distilled from the teacher via large-scale simulation with tiled rendering, trained with a mixture of online DAgger and behavior cloning. We find that compute scale is critical: scaling simulation to tens of GPUs (up to 64) makes both teacher and student training reliable, while low-compute regimes often fail. To bridge the sim-to-real gap, VIRAL combines large-scale visual domain randomization over lighting, materials, camera parameters, image quality, and sensor delays—with real-to-sim alignment of the dexterous hands and cameras. Deployed on a Unitree G1 humanoid, the resulting RGB-based policy performs continuous loco-manipulation for up to 54 cycles, generalizing to diverse spatial and appearance variations without any real-world fine-tuning, and approaching expert-level teleoperation performance. Extensive ablations dissect the key design choices required to make RGB-based humanoid loco-manipulation work in practice.",
    bibtex: `@article{he2025viral,
  title={VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation},
  author={He, Tairan and Wang, Zi and Xue, Haoru and Ben, Qingwei and Luo, Zhengyi and Xiao, Wenli and Yuan, Ye and Da, Xingye and Castañeda, Fernando and Sastry, Shankar and Liu, Changliu and Shi, Guanya and Fan, Linxi and Zhu, Yuke},
  journal={arXiv preprint arXiv:2511.15200},
  year={2025}
}`
  },
  {
    title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control",
    authors: "Zhengyi Luo*, Ye Yuan*, Tingwu Wang*, Chenran Li*, Sirui Chen, Fernando Castañeda, Zi-Ang Cao, Jiefeng Li, David Minor, Qingwei Ben, Xingye Da, Runyu Ding, Cyrus Hogg, Lina Song, Edy Lim, Eugene Jeong, Tairan He, Haoru Xue, Wenli Xiao, Zi Wang, Simon Yuen, Jan Kautz, Yan Chang, Umar Iqbal, Linxi ``Jim\" Fan†, Yuke Zhu†",
    year: "2025",
    link: "https://nvlabs.github.io/SONIC/",
    webpage: "https://nvlabs.github.io/SONIC/",
    pdf: "https://arxiv.org/abs/2511.07820",
    arxiv: "https://arxiv.org/abs/2511.07820",
    abstract: "Despite the rise of billion-parameter foundation models trained across thousands of GPUs, similar scaling gains have not been shown for humanoid control. Current neural controllers for humanoids remain modest in size, target a limited behavior set, and are trained on a handful of GPUs over several days. We show that scaling up model capacity, data, and compute yields a generalist humanoid controller capable of creating natural and robust whole-body movements. Specifically, we posit motion tracking as a natural and scalable task for humanoid control, leverageing dense supervision from diverse motion-capture data to acquire human motion priors without manual reward engineering. We build a foundation model for motion tracking by scaling along three axes: network size (from 1.2M to 42M parameters), dataset volume (over 100M frames, 700 hours of high-quality motion data), and compute (9k GPU hours). Beyond demonstrating the benefits of scale, we show the practical utility of our model through two mechanisms: (1) a real-time universal kinematic planner that bridges motion tracking to downstream task execution, enabling natural and interactive control, and (2) a unified token space that supports various motion input interfaces, such as VR teleoperation devices, human videos, and vision-language-action (VLA) models, all using the same policy. Scaling motion tracking exhibits favorable properties: performance improves steadily with increased compute and data diversity, and learned representations generalize to unseen motions, establishing motion tracking at scale as a practical foundation for humanoid control.",
    bibtex: `@article{luo2025sonic,
  title={SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control},
  author={Luo, Zhengyi and Yuan, Ye and Wang, Tingwu and Li, Chenran and Chen, Sirui and Casta\~neda, Fernando and Cao, Zi-Ang and Li, Jiefeng and Minor, David and Ben, Qingwei and Da, Xingye and Ding, Runyu and Hogg, Cyrus and Song, Lina and Lim, Edy and Jeong, Eugene and He, Tairan and Xue, Haoru and Xiao, Wenli and Wang, Zi and Yuen, Simon and Kautz, Jan and Chang, Yan and Iqbal, Umar and Fan, Linxi and Zhu, Yuke},
  journal={arXiv preprint arXiv:2511.07820},
  year={2025}
}`
  },
  {
    title: "HDMI: Learning Interactive Humanoid Whole-Body Control from Human Videos",
    authors: "Haoyang Weng, Yitang Li, Nikhil Sobanbabu, Zihan Wang, Zhengyi Luo, Tairan He, Deva Ramanan, Guanya Shi",
    year: "2025",
    link: "https://hdmi-humanoid.github.io/#/",
    webpage: "https://hdmi-humanoid.github.io/#/",
    pdf: "https://arxiv.org/abs/2509.16757",
    arxiv: "https://arxiv.org/abs/2509.16757",
    code: "https://github.com/LeCAR-Lab/HDMI",
    abstract: "Enabling robust whole-body humanoid-object interaction (HOI) remains challenging due to motion data scarcity and the contact-rich nature. We present HDMI (HumanoiD iMitation for Interaction), a simple and general framework that learns whole-body humanoid-object interaction skills directly from monocular RGB videos. Our pipeline (i) extracts and retargets human and object trajectories from unconstrained videos to build structured motion datasets, (ii) trains a reinforcement learning (RL) policy to co-track robot and object states with three key designs: a unified object representation, a residual action space, and a general interaction reward, and (iii) zero-shot deploys the RL policies on real humanoid robots. Extensive sim-to-real experiments on a Unitree G1 humanoid demonstrate the robustness and generality of our approach: HDMI achieves 67 consecutive door traversals and successfully performs 6 distinct loco-manipulation tasks in the real world and 14 tasks in simulation. Our results establish HDMI as a simple and general framework for acquiring interactive humanoid skills from human videos.",
    bibtex: `@article{weng2025hdmi,
  title={HDMI: Learning Interactive Humanoid Whole-Body Control from Human Videos},
  author={Weng, Haoyang and Li, Yitang and Sobanbabu, Nikhil and Wang, Zihan and Luo, Zhengyi and He, Tairan and Ramanan, Deva and Shi, Guanya},
  journal={arXiv preprint arXiv:2509.16757},
  year={2025}
}`
  },
  {
    title: "FALCON: Learning Force-Adaptive Humanoid Loco-Manipulation",
    authors: "Yuanhang Zhang, Yifu Yuan, Prajwal Gurunath, Tairan He, Shayegan Omidshafiei, Ali-akbar Agha-mohammadi, Marcell Vazquez-Chanlatte, Liam Pedersen, Guanya Shi",
    year: "2025",
    link: "https://lecar-lab.github.io/falcon-humanoid/",
    webpage: "https://lecar-lab.github.io/falcon-humanoid/",
    pdf: "https://arxiv.org/abs/2505.06776",
    arxiv: "https://arxiv.org/abs/2505.06776",
    code: "https://github.com/LeCAR-Lab/FALCON",
    abstract: "Humanoid loco-manipulation holds transformative potential for daily service and industrial tasks, yet achieving precise, robust whole-body control with 3D end-effector force interaction remains a major challenge. Prior approaches are often limited to lightweight tasks or quadrupedal/wheeled platforms. To overcome these limitations, we propose FALCON, a dual-agent reinforcement-learning-based framework for robust force-adaptive humanoid loco-manipulation.",
    bibtex: `@article{zhang2025falcon,
  title={FALCON: Learning Force-Adaptive Humanoid Loco-Manipulation},
  author={Zhang, Yuanhang and Yuan, Yifu and Gurunath, Prajwal and He, Tairan and Omidshafiei, Shayegan and Agha-mohammadi, Ali-akbar and Vazquez-Chanlatte, Marcell and Pedersen, Liam and Shi, Guanya},
  journal={arXiv preprint arXiv:2505.06776},
  year={2025}
}`
  }
  // 可以继续添加更多论文...
]
