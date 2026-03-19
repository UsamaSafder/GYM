const navToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

const workoutDataEl = document.getElementById('workouts-data');
const workoutDetailsEl = document.getElementById('workout-details');

if (workoutDataEl && workoutDetailsEl) {
    const workouts = JSON.parse(workoutDataEl.textContent || '[]');
    const buttons = document.querySelectorAll('.workout-btn');

    const renderWorkoutDetails = (id) => {
        const workout = workouts.find((item) => item.id === id);
        if (!workout) {
            return;
        }

        workoutDetailsEl.innerHTML = `
            <h3>${workout.title}</h3>
            <p><strong>Goal:</strong> ${workout.goal}</p>
            <div class="workout-meta">
                <span class="program-tag">Level: ${workout.level || 'All Levels'}</span>
                <span class="program-tag">Equipment: ${workout.equipment || 'General Equipment'}</span>
                <span class="program-tag">Frequency: ${workout.weekly_frequency || '3-4 days/week'}</span>
            </div>
            <p><strong>Estimated Duration:</strong> ${workout.duration}</p>
            <p><strong>Recommended Sets/Reps:</strong> ${workout.sets_reps}</p>
            <p><strong>Rest Guidance:</strong> ${workout.rest_guidance || 'Take enough rest to maintain good form.'}</p>
            <p><strong>Progression:</strong> ${workout.progression_guidance || 'Progress gradually week by week.'}</p>
            <h4>Exercises</h4>
            <ul>
                ${workout.exercises.map((exercise) => `<li>${exercise}</li>`).join('')}
            </ul>
            <h4>Coaching Notes</h4>
            <ul class="guidance-list">
                ${(workout.guidance || []).map((point) => `<li>${point}</li>`).join('')}
            </ul>
            ${
                workout.videos && workout.videos.length
                    ? `
                        <h4>Related YouTube Videos</h4>
                        <ul class="video-links">
                            ${workout.videos
                                .map(
                                    (video) =>
                                        `<li><a href="${video.url}" target="_blank" rel="noopener noreferrer">▶ ${video.title}</a></li>`
                                )
                                .join('')}
                        </ul>
                    `
                    : ''
            }
        `;
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            renderWorkoutDetails(button.dataset.workoutId);
            workoutDetailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

const gymSearchInput = document.getElementById('gym-search');
const gymCards = document.querySelectorAll('.gym-card');
const gymCount = document.getElementById('gym-results-count');
const cityChips = document.querySelectorAll('.city-chip');

if (gymSearchInput && gymCards.length) {
    let activeCityFilter = 'all';

    const updateGymCount = () => {
        const visible = [...gymCards].filter((card) => card.style.display !== 'none').length;
        if (gymCount) {
            gymCount.textContent = `${visible} gym(s) found`;
        }
    };

    const filterGyms = () => {
        const search = gymSearchInput.value.trim().toLowerCase();

        gymCards.forEach((card) => {
            const name = card.dataset.name || '';
            const city = card.dataset.city || '';
            const address = card.dataset.address || '';
            const facilities = card.dataset.facilities || '';

            const matchesSearch =
                name.includes(search) || city.includes(search) || address.includes(search) || facilities.includes(search);
            const matchesCity = activeCityFilter === 'all' || city.includes(activeCityFilter);

            card.style.display = matchesSearch && matchesCity ? '' : 'none';
        });

        updateGymCount();
    };

    updateGymCount();

    gymSearchInput.addEventListener('input', (event) => {
        if (event.target.value.trim()) {
            cityChips.forEach((chip) => chip.classList.remove('active'));
            const allChip = document.querySelector('.city-chip[data-city="all"]');
            if (allChip) {
                allChip.classList.add('active');
            }
            activeCityFilter = 'all';
        }

        filterGyms();
    });

    cityChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            cityChips.forEach((item) => item.classList.remove('active'));
            chip.classList.add('active');
            activeCityFilter = chip.dataset.city || 'all';
            gymSearchInput.value = '';
            filterGyms();
        });
    });
}

const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');

if (bmiForm && bmiResult) {
    bmiForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const height = Number(document.getElementById('height')?.value);
        const weight = Number(document.getElementById('weight')?.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            bmiResult.textContent = 'Please enter valid height and weight values.';
            return;
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        let category = 'Normal';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else if (bmi >= 30) {
            category = 'Obese';
        }

        bmiResult.textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
    });
}

const mealSelects = document.querySelectorAll('.meal-select');

if (mealSelects.length) {
    mealSelects.forEach((select) => {
        const options = JSON.parse(select.dataset.options || '[]');
        const targetId = select.dataset.target;
        const targetList = targetId ? document.getElementById(targetId) : null;

        if (!targetList) {
            return;
        }

        const renderMealItems = (index) => {
            const selectedOption = options[index];
            if (!selectedOption || !selectedOption.items) {
                return;
            }

            targetList.innerHTML = selectedOption.items.map((item) => `<li>${item}</li>`).join('');
        };

        select.addEventListener('change', (event) => {
            const selectedIndex = Number(event.target.value || 0);
            renderMealItems(selectedIndex);
        });
    });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
    revealElements.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index * 55, 330)}ms`);
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
}

const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
    const animateCounter = (counter) => {
        const target = Number(counter.dataset.counter || 0);
        const duration = 900;
        const start = performance.now();

        const step = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            counter.textContent = String(Math.floor(progress * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
}
