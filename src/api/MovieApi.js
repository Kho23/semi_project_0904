    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const backgroundImages1 = [pic1, pic2, pic3];
    const backgroundImages2 = [pic2, pic3, pic1];
    const backgroundImages3 = [pic3, pic1, pic2];
    const bgi = [backgroundImages1, backgroundImages2, backgroundImages3];

    export const movie=useEffect(() => {
      const sliderInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgi.length);
      }, 3000);

      return () => clearInterval(sliderInterval);
    }, []);
    //홈페이지 배경에 이미지 3개 슬라이더 만드는 함수