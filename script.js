document.addEventListener("DOMContentLoaded", () => {
    const numbersSection = document.getElementById("numbers");
    const numbers = document.querySelectorAll(".number-item h3");
    let hasAnimated = false;

    const animateNumbers = () => {
        numbers.forEach((number) => {
            const target = +number.getAttribute("data-target");
            const increment = target / 100; // Adjust speed
            let count = 0;

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    number.textContent = Math.ceil(count);
                    setTimeout(updateCount, 12); // Adjust speed
                } else {
                    number.textContent = `${target}+`; // Final value
                }
            };

            updateCount();
        });
    };

    const leftNumberSection = document.querySelector(".leftnumber");
    const leftNumbers = leftNumberSection.querySelectorAll(".number-item h3");
    let hasAnimatedLeftNumbers = false;

    const leftNumbersObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !hasAnimatedLeftNumbers) {
                hasAnimatedLeftNumbers = true;
                leftNumberSection.style.opacity = "1"; // Fade-in
                leftNumberSection.style.transform = "translateY(0)"; // Slide-up
                animateNumbers(leftNumbers);
            }
        },
        { threshold: 0.5 }
    );

    leftNumberSection.style.opacity = "0"; // Initially hidden for animation
    leftNumberSection.style.transform = "translateY(20px)"; // For scroll animation
    leftNumbersObserver.observe(leftNumberSection);

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                numbersSection.classList.add("visible");
                animateNumbers();
            }
        },
        { threshold: 0.5 }
    );

    observer.observe(numbersSection);
});
