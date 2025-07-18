import React, { useState } from 'react';
import './GreekQuestionScreen.css';

const GreekQuestionScreen = ({ user, onAnswer, onBack }) => {
  const [showGreekSelection, setShowGreekSelection] = useState(false);
  const [selectedGreek, setSelectedGreek] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Function to get reliable image URL with fallbacks
  const getImageUrl = (organizationName, defaultUrl) => {
    const fallbackImages = {
      "Delta Gamma": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
      "Kappa Alpha Order": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&crop=center&q=80",
      "Chi Phi": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center&q=80",
      "Theta Chi": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
      "Alpha Delta Pi": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=center&q=80",
      "Sigma Phi Epsilon": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center&q=80"
    };
    
    return fallbackImages[organizationName] || defaultUrl;
  };

  // University-specific Greek organizations database
  const universityGreekOrganizations = {
    // Default organizations (fallback)
    default: [
      {
        id: 1,
        name: "Chi Phi",
        type: "Fraternity",
        founded: 1824,
        description: "One of the oldest fraternities in the United States, focused on brotherhood, scholarship, and character development.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&crop=center&q=80",
        members: 45,
        isMember: false,
        colors: ["#1e3a8a", "#3b82f6"],
        motto: "Brotherhood, Scholarship, Character"
      },
      {
        id: 2,
        name: "Theta Chi",
        type: "Fraternity", 
        founded: 1856,
        description: "A brotherhood dedicated to developing leaders through academic excellence, community service, and lifelong friendships.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center&q=80",
        members: 52,
        isMember: false,
        colors: ["#dc2626", "#ef4444"],
        motto: "An Assisting Hand"
      },
      {
        id: 3,
        name: "Alpha Delta Pi",
        type: "Sorority",
        founded: 1851,
        description: "The first secret society for college women, promoting sisterhood, scholarship, and service to others.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
        members: 38,
        isMember: false,
        colors: ["#7c3aed", "#a855f7"],
        motto: "We Live for Each Other"
      },
      {
        id: 4,
        name: "Sigma Phi Epsilon",
        type: "Fraternity",
        founded: 1901,
        description: "Building balanced men through sound mind and sound body, emphasizing leadership and academic achievement.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
        members: 48,
        isMember: false,
        colors: ["#059669", "#10b981"],
        motto: "Building Balanced Men"
      },
      {
        id: 5,
        name: "Delta Gamma",
        type: "Sorority",
        founded: 1873,
        description: "Fostering high ideals of friendship, promoting educational and cultural interests, and creating a true sense of social responsibility.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
        members: 42,
        isMember: false,
        colors: ["#f59e0b", "#fbbf24"],
        motto: "Do Good"
      },
      {
        id: 6,
        name: "Kappa Alpha Order",
        type: "Fraternity",
        founded: 1865,
        description: "A brotherhood of gentlemen, scholars, and leaders committed to the highest ideals of character and achievement.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&crop=center&q=80",
        members: 55,
        isMember: false,
        colors: ["#dc2626", "#991b1b"],
        motto: "Dieu et les Dames"
      },
      {
        id: 7,
        name: "Alpha Kappa Alpha",
        type: "Sorority",
        founded: 1908,
        description: "The first African-American Greek-lettered sorority, promoting sisterhood, scholarship, and service to all mankind.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
        members: 48,
        isMember: false,
        colors: ["#7c3aed", "#a855f7"],
        motto: "By Culture and By Merit"
      },
      {
        id: 8,
        name: "Phi Beta Sigma",
        type: "Fraternity",
        founded: 1914,
        description: "A brotherhood of college men dedicated to the principles of brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center&q=80",
        members: 52,
        isMember: false,
        colors: ["#059669", "#10b981"],
        motto: "Culture for Service and Service for Humanity"
      },
      {
        id: 9,
        name: "Zeta Phi Beta",
        type: "Sorority",
        founded: 1920,
        description: "A community-conscious, action-oriented organization promoting scholarship, service, sisterly love, and finer womanhood.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=center&q=80",
        members: 44,
        isMember: false,
        colors: ["#f59e0b", "#fbbf24"],
        motto: "A Community-Conscious, Action-Oriented Organization"
      },
      {
        id: 10,
        name: "Sigma Gamma Rho",
        type: "Sorority",
        founded: 1922,
        description: "An international collegiate sorority committed to enhancing the quality of life for women and their families.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
        members: 46,
        isMember: false,
        colors: ["#dc2626", "#991b1b"],
        motto: "Greater Service, Greater Progress"
      }
    ],
    
    // University of California, Berkeley
    "University of California, Berkeley": [
      {
        id: 101,
        name: "Alpha Epsilon Pi",
        type: "Fraternity",
        founded: 1913,
        description: "A Jewish fraternity focused on leadership development, academic excellence, and community service.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&crop=center&q=80",
        members: 65,
        isMember: false,
        colors: ["#1e40af", "#3b82f6"],
        motto: "The Jewish Fraternity"
      },
      {
        id: 102,
        name: "Delta Delta Delta",
        type: "Sorority",
        founded: 1888,
        description: "Promoting scholarship, leadership, and sisterhood while developing strong, confident women.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
        members: 58,
        isMember: false,
        colors: ["#7c3aed", "#a855f7"],
        motto: "Let Us Steadfastly Love One Another"
      },
      {
        id: 103,
        name: "Sigma Chi",
        type: "Fraternity",
        founded: 1855,
        description: "Building enduring friendships and developing character through leadership and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center&q=80",
        members: 72,
        isMember: false,
        colors: ["#dc2626", "#ef4444"],
        motto: "In Hoc Signo Vinces"
      },
      {
        id: 104,
        name: "Kappa Alpha Theta",
        type: "Sorority",
        founded: 1870,
        description: "Empowering women to be their authentic selves through leadership, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=center&q=80",
        members: 61,
        isMember: false,
        colors: ["#059669", "#10b981"],
        motto: "Leading Women"
      },
      {
        id: 105,
        name: "Phi Delta Theta",
        type: "Fraternity",
        founded: 1848,
        description: "Building men of character through friendship, sound learning, and moral rectitude.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
        members: 68,
        isMember: false,
        colors: ["#f59e0b", "#fbbf24"],
        motto: "One Man is No Man"
      },
      {
        id: 106,
        name: "Alpha Phi",
        type: "Sorority",
        founded: 1872,
        description: "Advancing women's lives through leadership, scholarship, and sisterhood.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&crop=center&q=80",
        members: 55,
        isMember: false,
        colors: ["#dc2626", "#991b1b"],
        motto: "Union Hand in Hand"
      }
    ],

    // Stanford University
    "Stanford University": [
      {
        id: 201,
        name: "Kappa Sigma",
        type: "Fraternity",
        founded: 1869,
        description: "A brotherhood of leaders, scholars, and gentlemen committed to excellence in all endeavors.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 45,
        isMember: false
      },
      {
        id: 202,
        name: "Pi Beta Phi",
        type: "Sorority",
        founded: 1867,
        description: "Promoting friendship, developing women of intellect and integrity, and cultivating leadership potential.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 52,
        isMember: false
      },
      {
        id: 203,
        name: "Delta Tau Delta",
        type: "Fraternity",
        founded: 1858,
        description: "Building character through leadership, scholarship, and brotherhood.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 48,
        isMember: false
      },
      {
        id: 204,
        name: "Gamma Phi Beta",
        type: "Sorority",
        founded: 1874,
        description: "Building confident women of character who celebrate sisterhood and make a difference in the world.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 49,
        isMember: false
      }
    ],

    // University of Michigan
    "University of Michigan": [
      {
        id: 301,
        name: "Alpha Tau Omega",
        type: "Fraternity",
        founded: 1865,
        description: "Developing leaders of character through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 78,
        isMember: false
      },
      {
        id: 302,
        name: "Chi Omega",
        type: "Sorority",
        founded: 1895,
        description: "Fostering personal integrity, excellence in academic and intellectual pursuits, and intergenerational participation.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 85,
        isMember: false
      },
      {
        id: 303,
        name: "Sigma Alpha Epsilon",
        type: "Fraternity",
        founded: 1856,
        description: "Building gentlemen, scholars, and leaders through brotherhood and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 82,
        isMember: false
      },
      {
        id: 304,
        name: "Delta Zeta",
        type: "Sorority",
        founded: 1902,
        description: "Enriching the lives of our members through lifelong friendship, leadership, and service.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 76,
        isMember: false
      },
      {
        id: 305,
        name: "Phi Gamma Delta",
        type: "Fraternity",
        founded: 1848,
        description: "Building men of character through friendship, knowledge, service, morality, and excellence.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
        members: 71,
        isMember: false
      }
    ],

    // University of Texas at Austin
    "University of Texas at Austin": [
      {
        id: 401,
        name: "Beta Theta Pi",
        type: "Fraternity",
        founded: 1839,
        description: "Developing men of principle for a principled life through brotherhood, scholarship, and leadership.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 89,
        isMember: false
      },
      {
        id: 402,
        name: "Alpha Chi Omega",
        type: "Sorority",
        founded: 1885,
        description: "Empowering women to realize their potential while advancing the understanding of women's history.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 92,
        isMember: false
      },
      {
        id: 403,
        name: "Lambda Chi Alpha",
        type: "Fraternity",
        founded: 1909,
        description: "Building leaders through brotherhood, scholarship, and service to others.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 76,
        isMember: false
      },
      {
        id: 404,
        name: "Kappa Kappa Gamma",
        type: "Sorority",
        founded: 1870,
        description: "Promoting scholarship, leadership, and friendship while developing women of character.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 88,
        isMember: false
      }
    ],

    // University of California, Los Angeles
    "University of California, Los Angeles": [
      {
        id: 501,
        name: "Alpha Gamma Rho",
        type: "Fraternity",
        founded: 1904,
        description: "Building men of character through brotherhood, scholarship, and leadership in agriculture.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 62,
        isMember: false
      },
      {
        id: 502,
        name: "Alpha Omicron Pi",
        type: "Sorority",
        founded: 1897,
        description: "Promoting friendship, developing women of intellect and integrity, and cultivating leadership potential.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 68,
        isMember: false
      },
      {
        id: 503,
        name: "Delta Sigma Phi",
        type: "Fraternity",
        founded: 1899,
        description: "Building better men through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 55,
        isMember: false
      },
      {
        id: 504,
        name: "Zeta Tau Alpha",
        type: "Sorority",
        founded: 1898,
        description: "Making a difference in the lives of our members by developing the potential of each individual.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 71,
        isMember: false
      }
    ],

    // University of Southern California
    "University of Southern California": [
      {
        id: 601,
        name: "Alpha Delta Gamma",
        type: "Fraternity",
        founded: 1924,
        description: "Building men of character through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 58,
        isMember: false
      },
      {
        id: 602,
        name: "Alpha Epsilon Phi",
        type: "Sorority",
        founded: 1909,
        description: "Empowering women to be their authentic selves through leadership, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 64,
        isMember: false
      },
      {
        id: 603,
        name: "Phi Kappa Psi",
        type: "Fraternity",
        founded: 1852,
        description: "Building men of character through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 67,
        isMember: false
      },
      {
        id: 604,
        name: "Sigma Kappa",
        type: "Sorority",
        founded: 1874,
        description: "Promoting friendship, developing women of intellect and integrity, and cultivating leadership potential.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 59,
        isMember: false
      }
    ],

    // University of California, San Diego
    "University of California, San Diego": [
      {
        id: 701,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 45,
        isMember: false
      },
      {
        id: 702,
        name: "Delta Phi Epsilon",
        type: "Sorority",
        founded: 1917,
        description: "Promoting good fellowship among the women students, and developing in them high ideals of friendship.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 52,
        isMember: false
      },
      {
        id: 703,
        name: "Pi Kappa Alpha",
        type: "Fraternity",
        founded: 1868,
        description: "Building men of integrity, intellect, and high moral character.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 48,
        isMember: false
      }
    ],

    // University of California, Davis
    "University of California, Davis": [
      {
        id: 801,
        name: "Alpha Gamma Sigma",
        type: "Fraternity",
        founded: 1923,
        description: "Promoting scholarship, leadership, and brotherhood among agricultural students.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 42,
        isMember: false
      },
      {
        id: 802,
        name: "Alpha Xi Delta",
        type: "Sorority",
        founded: 1893,
        description: "Inspiring women to realize their potential through the power of sisterhood.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 56,
        isMember: false
      },
      {
        id: 803,
        name: "Sigma Nu",
        type: "Fraternity",
        founded: 1869,
        description: "Building men of character through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 51,
        isMember: false
      }
    ],

    // University of California, Irvine
    "University of California, Irvine": [
      {
        id: 901,
        name: "Alpha Phi Alpha",
        type: "Fraternity",
        founded: 1906,
        description: "Developing leaders, promoting brotherhood and academic excellence, while providing service and advocacy.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 38,
        isMember: false
      },
      {
        id: 902,
        name: "Delta Sigma Theta",
        type: "Sorority",
        founded: 1913,
        description: "Promoting academic excellence and providing assistance to persons in need through public service.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 44,
        isMember: false
      },
      {
        id: 903,
        name: "Kappa Alpha Psi",
        type: "Fraternity",
        founded: 1911,
        description: "Achievement in every field of human endeavor through brotherhood and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 41,
        isMember: false
      }
    ],

    // University of California, Santa Barbara
    "University of California, Santa Barbara": [
      {
        id: 1001,
        name: "Alpha Kappa Psi",
        type: "Fraternity",
        founded: 1904,
        description: "Developing principled business leaders through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 47,
        isMember: false
      },
      {
        id: 1002,
        name: "Alpha Sigma Alpha",
        type: "Sorority",
        founded: 1901,
        description: "Promoting friendship, developing women of intellect and integrity, and cultivating leadership potential.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 53,
        isMember: false
      },
      {
        id: 1003,
        name: "Phi Sigma Kappa",
        type: "Fraternity",
        founded: 1873,
        description: "Building men of character through brotherhood, scholarship, and service.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 49,
        isMember: false
      }
    ],

    // University of California, Santa Cruz
    "University of California, Santa Cruz": [
      {
        id: 1101,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 35,
        isMember: false
      },
      {
        id: 1102,
        name: "Gamma Phi Beta",
        type: "Sorority",
        founded: 1874,
        description: "Building confident women of character who celebrate sisterhood and make a difference in the world.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 41,
        isMember: false
      }
    ],

    // University of California, Riverside
    "University of California, Riverside": [
      {
        id: 1201,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 33,
        isMember: false
      },
      {
        id: 1202,
        name: "Delta Gamma",
        type: "Sorority",
        founded: 1873,
        description: "Fostering high ideals of friendship, promoting educational and cultural interests, and creating a true sense of social responsibility.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 39,
        isMember: false
      }
    ],

    // University of California, Merced
    "University of California, Merced": [
      {
        id: 1301,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 28,
        isMember: false
      }
    ],

    // California State University, Long Beach
    "California State University, Long Beach": [
      {
        id: 1401,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 52,
        isMember: false
      },
      {
        id: 1402,
        name: "Delta Zeta",
        type: "Sorority",
        founded: 1902,
        description: "Enriching the lives of our members through lifelong friendship, leadership, and service.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 58,
        isMember: false
      }
    ],

    // California State University, Fullerton
    "California State University, Fullerton": [
      {
        id: 1501,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 48,
        isMember: false
      },
      {
        id: 1502,
        name: "Gamma Phi Beta",
        type: "Sorority",
        founded: 1874,
        description: "Building confident women of character who celebrate sisterhood and make a difference in the world.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 54,
        isMember: false
      }
    ],

    // California State University, Northridge
    "California State University, Northridge": [
      {
        id: 1601,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 45,
        isMember: false
      }
    ],

    // San Diego State University
    "San Diego State University": [
      {
        id: 1701,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 67,
        isMember: false
      },
      {
        id: 1702,
        name: "Delta Gamma",
        type: "Sorority",
        founded: 1873,
        description: "Fostering high ideals of friendship, promoting educational and cultural interests, and creating a true sense of social responsibility.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 73,
        isMember: false
      }
    ],

    // San Jose State University
    "San Jose State University": [
      {
        id: 1801,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 41,
        isMember: false
      }
    ],

    // California Polytechnic State University
    "California Polytechnic State University": [
      {
        id: 1901,
        name: "Alpha Gamma Rho",
        type: "Fraternity",
        founded: 1904,
        description: "Building men of character through brotherhood, scholarship, and leadership in agriculture.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 55,
        isMember: false
      },
      {
        id: 1902,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=200&fit=crop",
        members: 62,
        isMember: false
      }
    ],

    // University of San Francisco
    "University of San Francisco": [
      {
        id: 2001,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 38,
        isMember: false
      }
    ],

    // Santa Clara University
    "Santa Clara University": [
      {
        id: 2101,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 42,
        isMember: false
      },
      {
        id: 2102,
        name: "Delta Gamma",
        type: "Sorority",
        founded: 1873,
        description: "Fostering high ideals of friendship, promoting educational and cultural interests, and creating a true sense of social responsibility.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
        members: 48,
        isMember: false
      }
    ],

    // Loyola Marymount University
    "Loyola Marymount University": [
      {
        id: 2201,
        name: "Alpha Phi Omega",
        type: "Fraternity",
        founded: 1925,
        description: "Building leaders through service to others, developing friendship, and promoting character.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
        members: 36,
        isMember: false
      },
      {
        id: 2202,
        name: "Gamma Phi Beta",
        type: "Sorority",
        founded: 1874,
        description: "Building confident women of character who celebrate sisterhood and make a difference in the world.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=200&fit=crop",
        members: 41,
        isMember: false
      }
    ]
  };

  // Get the appropriate Greek organizations based on the user's university
  const getGreekOrganizations = () => {
    const userUniversity = user?.university;
    
    if (userUniversity && universityGreekOrganizations[userUniversity]) {
      return universityGreekOrganizations[userUniversity];
    }
    
    // Fallback to default organizations if university not found
    return universityGreekOrganizations.default;
  };

  const greekOrganizations = getGreekOrganizations();

  const handleGreekInvolved = () => {
    setShowGreekSelection(true);
  };

  const handleNotInvolved = () => {
    // Skip directly to home page by calling onAnswer with false
    onAnswer(false);
  };

  const handleGreekSelect = (greek) => {
    setSelectedGreek(greek);
    // Scroll to top to show selection summary
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinRequest = () => {
    setShowJoinModal(true);
  };

  const handleSubmitJoinRequest = () => {
    if (selectedGreek) {
      // In a real app, you'd send the join request to the server
      console.log('Join request sent for:', selectedGreek.name);
      
      // Create a simple user object with the Greek organization info
      const updatedUser = {
        name: user?.name || 'User',
        university: user?.university || 'University',
        greekOrganization: {
          id: selectedGreek.id,
          name: selectedGreek.name,
          type: selectedGreek.type,
          founded: selectedGreek.founded,
          description: selectedGreek.description,
          image: selectedGreek.image,
          members: selectedGreek.members
        },
        joinStatus: 'pending'
      };
      
      // Call onAnswer with the updated user data
      onAnswer(updatedUser);
    }
  };

  const handleCloseModal = () => {
    setShowJoinModal(false);
  };

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showJoinModal) {
        handleCloseModal();
      }
    };

    if (showJoinModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showJoinModal]);

  const handleBackToSelection = () => {
    setShowGreekSelection(false);
    setSelectedGreek(null);
    setShowJoinModal(false);
  };

  if (showGreekSelection) {
    return (
      <div className="greek-selection-screen">
        <div className="greek-selection-header">
          <div className="header-content">
            <div className="header-left">
              <h1>Select Your Greek Organization</h1>
              <p>Choose the Greek organization you're a member of or request to join at {user?.university || 'your university'}</p>
            </div>
            <div className="header-right">
              <button className="btn btn-outline" onClick={handleBackToSelection}>
                ← Back
              </button>
            </div>
          </div>
        </div>

        <div className="greek-selection-content">
          {selectedGreek && (
            <div className="selection-summary">
              <div className="summary-content">
                <h3>✓ Selected: {selectedGreek.name}</h3>
                <p>You've selected {selectedGreek.name} ({selectedGreek.type}). You can now request to join or continue browsing other organizations.</p>
                <div className="summary-actions">
                  <button className="btn btn-primary" onClick={handleJoinRequest}>
                    Request to Join {selectedGreek.name}
                  </button>
                  <button className="btn btn-outline" onClick={() => setSelectedGreek(null)}>
                    Clear Selection
                  </button>
                  <button className="btn btn-secondary" onClick={() => setSelectedGreek(null)}>
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="greek-organizations-grid">
            {greekOrganizations.map((greek, index) => (
              <div 
                key={greek.id} 
                className={`greek-organization-card ${selectedGreek?.id === greek.id ? 'selected' : ''}`}
                onClick={() => handleGreekSelect(greek)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="greek-organization-image">
                  <img 
                    src={getImageUrl(greek.name, greek.image)} 
                    alt={greek.name}
                    onError={(e) => {
                      console.log(`Image failed to load for ${greek.name}:`, e.target.src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                      setImageErrors(prev => ({ ...prev, [greek.id]: true }));
                    }}
                    onLoad={(e) => {
                      e.target.style.opacity = '1';
                      setImageErrors(prev => ({ ...prev, [greek.id]: false }));
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  />
                  <div className="image-fallback" style={{ display: imageErrors[greek.id] ? 'flex' : 'none' }}>
                    <span className="fallback-icon">🏛️</span>
                    <span className="fallback-text">{greek.name}</span>
                  </div>
                  <div className="greek-type-badge">
                    {greek.type}
                  </div>
                  <div className="greek-overlay">
                    <div className="overlay-content">
                      <span className="overlay-icon">✓</span>
                      <span className="overlay-text">Selected</span>
                    </div>
                  </div>
                </div>
                
                <div className="greek-organization-content">
                  <div className="greek-header">
                    <h3>{greek.name}</h3>
                    {greek.motto && (
                      <p className="greek-motto">"{greek.motto}"</p>
                    )}
                  </div>
                  
                  <p className="greek-description">{greek.description}</p>
                  
                  <div className="greek-details">
                    <div className="detail-item">
                      <span className="detail-icon">🏛️</span>
                      <span>Founded {greek.founded}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>{greek.members} members</span>
                    </div>
                  </div>

                  <div className="greek-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGreekSelect(greek);
                      }}
                    >
                      {selectedGreek?.id === greek.id ? '✓ Selected' : 'Select This Organization'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Request Modal */}
        {showJoinModal && selectedGreek && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Request to Join {selectedGreek.name}</h2>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="modal-image">
                  <img 
                    src={getImageUrl(selectedGreek.name, selectedGreek.image)} 
                    alt={selectedGreek.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-fallback" style={{ display: 'none' }}>
                    <span className="fallback-icon">🏛️</span>
                    <span className="fallback-text">{selectedGreek.name}</span>
                  </div>
                </div>
                
                <div className="modal-info">
                  <p className="modal-description">{selectedGreek.description}</p>
                  
                  <div className="modal-details">
                    <div className="modal-detail">
                      <strong>Type:</strong> {selectedGreek.type}
                    </div>
                    <div className="modal-detail">
                      <strong>Founded:</strong> {selectedGreek.founded}
                    </div>
                    <div className="modal-detail">
                      <strong>Members:</strong> {selectedGreek.members}
                    </div>
                  </div>

                  <div className="join-notice">
                    <h4>Join Request Process</h4>
                    <p>Your request will be reviewed by the organization's leadership. You'll be notified of the decision within 3-5 business days.</p>
                    <ul>
                      <li>Complete application form</li>
                      <li>Interview with current members</li>
                      <li>Review by leadership committee</li>
                      <li>Final decision notification</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSubmitJoinRequest}>
                  Submit Request
                </button>
                <button className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="greek-question-screen">
      <div className="greek-question-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="header-content">
          <div className="header-left">
            <h1>Greek Life Involvement</h1>
            <p>Tell us about your Greek life experience at {user?.university || 'your university'}</p>
          </div>
        </div>
      </div>

      <div className="greek-question-content">
        <div className="question-card">
          <div className="question-header">
            <h2>Are you currently involved in Greek life?</h2>
            <p>This helps us personalize your experience and connect you with relevant organizations and events at {user?.university || 'your university'}.</p>
          </div>

          <div className="question-options">
            <div className="option-card" onClick={handleGreekInvolved}>
              <div className="option-icon">🏛️</div>
              <h3>I'm in a Greek organization</h3>
              <p>I'm currently a member of a fraternity or sorority and want to connect with my organization.</p>
              <button className="btn btn-primary">Select This Option</button>
            </div>

            <div className="option-card" onClick={handleNotInvolved}>
              <div className="option-icon">🎯</div>
              <h3>Not currently involved</h3>
              <p>I'm not in a Greek organization but want to explore campus clubs, events, and community activities.</p>
              <button className="btn btn-outline">Select This Option</button>
            </div>
          </div>

          <div className="question-footer">
            <p>You can always update your preferences later in your profile settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreekQuestionScreen; 