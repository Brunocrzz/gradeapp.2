import styles from '@/styles/Dash.module.css';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import ComponentProfile from "@/components/Profile";
import ComponentMyClasses from "@/components/Classes";
import ComponentMyWeek from "@/components/MyWeek";
import ComponentReminders from "@/components/Reminders/Reminders";
import Floating from '@/components/Floating/Floating';
import { useEffect, useState } from "react";
import { AlertModal } from "@/components/alertModal";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import AddDegreeModal from '@/components/AddDegreeModal/addDegreeModal';
import Focus from '@/components/Focus/Focus';
import StudyCard from '@/components/FlashCards/StudyCard';
import Suggestions from '@/components/Suggestions/suggestions';
import Pomodoro from '@/components/Pomodoro/pomodoro';

export default function Dashboard(){
    const { handleSignOut } = useAuth();
    const { updatedUserData, loading } = useUserData();
    const [openModal, setOpenModal] = useState(false);
    const [openStudyCard, setOpenStudyCard] = useState(false);
   
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleDarkMode = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('darkMode', newIsDarkMode ? 'true' : 'false');
        }
    };
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const darkMode = localStorage.getItem('darkMode');
            setIsDarkMode(darkMode === 'true');
        }
    }, []);

    const [openFocus, setOpenFocus] = useState(false);
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const [openPomodoro, setOpenPomodoro] = useState(false);

    useEffect(() => {
        if (updatedUserData && updatedUserData.length > 0 && updatedUserData[0].degree_id === null) {
          setOpenModal(true);
        }
    }, [updatedUserData]);
    const [redTheme, setRedTheme] = useState(false);
    const handleRedTheme = () => {
        const root = document.documentElement;
        const isRed = root.style.getPropertyValue('--main-color') === '#F45151';
        if (isRed) {
          root.style.setProperty('--main-color', '#7D00E4');
            setRedTheme(false);
        } else {
            root.style.setProperty('--main-color', '#F45151');
            setRedTheme(true);
        }
    };
    if(loading){
        return <div>...</div>
    }
    return (
        <main className={`${isDarkMode? styles.darkMode : styles.lightMode} ${styles.mainContainer}`}>
            {openModal && <AddDegreeModal setOpenModal={setOpenModal}/>}
            {openFocus && <Focus openFocus={openFocus} setOpenFocus={setOpenFocus}/>}
            {openPomodoro && <Pomodoro openPomodoro={openPomodoro} setOpenPomodoro={setOpenPomodoro}/>}
            {openSuggestions && <Suggestions openSuggestions={openSuggestions} setOpenSuggestions={setOpenSuggestions}/>}
            {openStudyCard && <StudyCard openStudyCard={openStudyCard} setOpenStudyCard={setOpenStudyCard}/>}
            <AlertModal/>
            <header>
                <nav>

                    <svg  viewBox="0 0 566 414" xmlns="http://www.w3.org/2000/svg" className={styles.logogradeplus}>
                        <g clipPath="url(#clip0_1_745)">
                        <path d="M269.635 301.293L233.396 260.242C230.19 256.618 225.605 254.425 220.648 254.145C215.691 253.865 210.767 255.521 206.957 258.75L192.596 270.941L158.858 232.723L163.891 175.617L203.999 141.566L216.078 155.25C219.285 158.875 223.87 161.068 228.826 161.348C233.783 161.627 238.707 159.971 242.518 156.742L285.598 120.168C289.402 116.932 291.779 112.391 292.206 107.54C292.634 102.689 291.077 97.9247 287.878 94.2934L251.64 53.2424C248.433 49.6176 243.848 47.4247 238.891 47.1449C233.934 46.8651 229.01 48.5213 225.2 51.75L182.12 88.324C178.316 91.5599 175.939 96.1018 175.511 100.953C175.084 105.804 176.64 110.568 179.839 114.199L191.919 127.883L151.811 161.933L89.5856 158.421C87.1068 158.281 84.6448 159.111 82.7409 160.727C80.837 162.343 79.6472 164.614 79.433 167.04L73.7319 231.727C73.5185 234.153 74.2983 236.535 75.8999 238.349C77.5014 240.164 79.7936 241.262 82.2722 241.402L144.498 244.914L178.236 283.133L163.876 295.324C160.072 298.56 157.696 303.102 157.268 307.953C156.841 312.804 158.397 317.568 161.596 321.199L197.835 362.25C201.041 365.875 205.626 368.068 210.583 368.348C215.54 368.627 220.464 366.971 224.274 363.742L267.355 327.168C271.159 323.932 273.535 319.391 273.963 314.54C274.391 309.689 272.834 304.925 269.635 301.293ZM237.28 65.4337L273.518 106.485L230.438 143.059L194.199 102.008L237.28 65.4337ZM93.2309 223.636L97.3197 177.242L144.726 179.918L140.637 226.312L93.2309 223.636ZM175.956 309.008L219.036 272.434L255.275 313.485L212.195 350.059L175.956 309.008Z"  fill-opacity="0.99"/>
                        </g>
                        <path d="M251.298 228.45C247.191 228.45 243.528 227.68 240.308 226.14C237.134 224.553 234.661 222.383 232.888 219.63C231.114 216.83 230.228 213.657 230.228 210.11V196.32C230.228 192.773 231.091 189.647 232.818 186.94C234.591 184.187 237.041 182.04 240.168 180.5C243.341 178.96 246.934 178.19 250.948 178.19C254.961 178.19 258.531 178.82 261.658 180.08C264.831 181.293 267.281 182.997 269.008 185.19C270.781 187.383 271.668 189.88 271.668 192.68C271.668 194.313 271.131 195.597 270.058 196.53C268.984 197.417 267.538 197.86 265.718 197.86C264.831 197.86 263.991 197.767 263.198 197.58C263.338 196.88 263.408 195.853 263.408 194.5C263.408 191.84 262.241 189.67 259.908 187.99C257.621 186.31 254.634 185.47 250.948 185.47C247.308 185.47 244.344 186.473 242.058 188.48C239.771 190.487 238.628 193.1 238.628 196.32V210.11C238.628 212.257 239.164 214.17 240.238 215.85C241.311 217.53 242.804 218.837 244.718 219.77C246.631 220.703 248.824 221.17 251.298 221.17C254.891 221.17 257.831 220.307 260.118 218.58C262.451 216.807 263.618 214.567 263.618 211.86V209.06H256.618C254.984 209.06 253.631 208.453 252.558 207.24C251.531 205.98 251.018 204.347 251.018 202.34H268.028C269.241 202.34 270.198 202.69 270.898 203.39C271.644 204.09 272.018 205.023 272.018 206.19V212C272.018 215.173 271.131 218.02 269.358 220.54C267.631 223.013 265.181 224.95 262.008 226.35C258.881 227.75 255.311 228.45 251.298 228.45ZM279.608 182.67C279.608 181.597 280.004 180.687 280.798 179.94C281.638 179.193 282.664 178.82 283.878 178.82H302.708C307.561 178.82 311.364 180.15 314.118 182.81C316.918 185.47 318.318 189.133 318.318 193.8C318.318 196.553 317.734 198.887 316.568 200.8C315.401 202.667 313.651 204.16 311.318 205.28V205.56C313.371 206.447 314.934 207.777 316.008 209.55C317.081 211.277 317.618 213.423 317.618 215.99V222.01C317.618 224.11 316.894 225.72 315.448 226.84C314.048 227.913 311.971 228.45 309.218 228.45V216.34C309.218 211.3 307.071 208.78 302.778 208.78H287.938V222.01C287.938 224.11 287.214 225.72 285.768 226.84C284.368 227.913 282.314 228.45 279.608 228.45V182.67ZM302.358 201.57C304.691 201.57 306.511 200.893 307.818 199.54C309.171 198.14 309.848 196.203 309.848 193.73C309.848 188.597 307.351 186.03 302.358 186.03H287.938V201.57H302.358ZM330.566 228.45C328.746 228.217 327.322 227.563 326.296 226.49C325.269 225.37 324.756 224.017 324.756 222.43C324.756 221.17 325.059 219.91 325.666 218.65L341.906 180.92C342.699 179.1 344.076 178.19 346.036 178.19C347.949 178.19 349.326 179.1 350.166 180.92L366.406 218.65C366.966 219.957 367.246 221.193 367.246 222.36C367.246 223.993 366.732 225.37 365.706 226.49C364.679 227.563 363.256 228.217 361.436 228.45L355.486 214.73H336.516L330.566 228.45ZM352.896 207.45L344.776 187.08L344.006 187.36L345.616 191.35L339.106 207.45H352.896ZM378.829 227.82C377.616 227.82 376.589 227.447 375.749 226.7C374.956 225.953 374.559 225.02 374.559 223.9V182.67C374.559 181.597 374.956 180.687 375.749 179.94C376.589 179.193 377.616 178.82 378.829 178.82H394.649C398.709 178.82 402.302 179.59 405.429 181.13C408.602 182.67 411.052 184.84 412.779 187.64C414.506 190.44 415.369 193.66 415.369 197.3V209.13C415.369 212.77 414.482 216.013 412.709 218.86C410.982 221.66 408.532 223.853 405.359 225.44C402.232 227.027 398.662 227.82 394.649 227.82H378.829ZM393.949 220.54C398.102 220.54 401.299 219.56 403.539 217.6C405.826 215.64 406.969 212.863 406.969 209.27V197.23C406.969 193.637 405.849 190.883 403.609 188.97C401.369 187.057 398.149 186.1 393.949 186.1H382.959V220.54H393.949ZM423.163 182.67C423.163 181.597 423.559 180.687 424.353 179.94C425.193 179.193 426.219 178.82 427.433 178.82H458.583C458.583 181.34 458.116 183.183 457.183 184.35C456.296 185.517 454.849 186.1 452.843 186.1H431.563V199.47H450.533C450.533 201.99 450.066 203.833 449.133 205C448.246 206.167 446.823 206.75 444.863 206.75H431.563V220.54H454.313C456.273 220.54 457.696 221.123 458.583 222.29C459.516 223.457 459.983 225.3 459.983 227.82H427.433C426.219 227.82 425.193 227.447 424.353 226.7C423.559 225.953 423.163 225.02 423.163 223.9V182.67ZM480.906 210.95H465.576C465.576 208.71 466.066 206.96 467.046 205.7C468.026 204.393 469.496 203.74 471.456 203.74H480.906V195.69C480.906 193.543 481.583 192.003 482.936 191.07C484.336 190.137 486.413 189.67 489.166 189.67V203.74H504.426C504.426 206.027 503.936 207.8 502.956 209.06C501.976 210.32 500.506 210.95 498.546 210.95H489.166V219.14C489.166 223.153 486.413 225.16 480.906 225.16V210.95Z"  fill-opacity="0.99"/>
                        <defs>
                        <clipPath id="clip0_1_745">
                        <rect width="292.043" height="301.395" fill="white" transform="matrix(0.6618 0.74968 -0.762325 0.647195 229.761 0)"/>
                        </clipPath>
                        </defs>
                    </svg>  
                        
                    <div className={styles.btnNavBar}>
                        <button onClick={handleDarkMode}>{isDarkMode?'Dark':'Light'}</button> 
                        <button onClick={handleSignOut}>Sair</button>
                    </div>
                </nav>
            </header>

            <section className={styles.containerComponents}>
                <section className={styles.leftSide}>
                    <ComponentProfile/>
                    <ComponentMyClasses/>
                </section>
                <section className={styles.rightSide}>
                    <ComponentMyWeek isDarkMode={isDarkMode}/>
                    <ComponentReminders/>
                </section>
            </section>  

            <section className={styles.containerFloating}>
                <Floating 
                    openFocus={openFocus} 
                    setOpenFocus={setOpenFocus}
                    openStudyCard={openStudyCard}
                    setOpenStudyCard={setOpenStudyCard}
                    openSuggestions={openSuggestions}
                    setOpenSuggestions={setOpenSuggestions}
                    openPomodoro={openPomodoro}
                    setOpenPomodoro={setOpenPomodoro}
                    />
            </section>

            
            
        </main>
    )
}

