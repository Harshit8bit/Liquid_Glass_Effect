  // Wait until the entire page is loaded before running the script
        document.addEventListener('DOMContentLoaded', () => {

            // --- 1. Get references to all the important elements ---
            const menuBar = document.querySelector('.bottom-menu-bar');
            const menuItems = document.querySelectorAll('.menu-item');
            const blurPill = document.querySelector('.blur-pill');

            let currentActiveItem = null;

            // --- 2. Core Logic Function ---
            function positionBlurPill(targetItem) {
                if (!targetItem) {
                    blurPill.style.opacity = '0';
                    blurPill.style.transform = 'translateY(-50%) scale(0.9)';
                    if (currentActiveItem) {
                        currentActiveItem.classList.remove('active');
                    }
                    currentActiveItem = null;
                    return;
                }

                if (currentActiveItem && currentActiveItem !== targetItem) {
                    currentActiveItem.classList.remove('active');
                }
                targetItem.classList.add('active');
                currentActiveItem = targetItem;

                const itemRect = targetItem.getBoundingClientRect();
                const menuBarRect = menuBar.getBoundingClientRect();
                const left = itemRect.left - menuBarRect.left;
                
                blurPill.style.left = `${left}px`;
                blurPill.style.width = `${itemRect.width}px`;
                blurPill.style.height = `${itemRect.height}px`;
                blurPill.style.opacity = '1';
                blurPill.style.transform = 'translateY(-50%) scale(1)';
            }

            // --- 3. Event Listeners ---
            const initiallyActiveItem = document.querySelector('.menu-item.active');
            if (initiallyActiveItem) {
                setTimeout(() => {
                    positionBlurPill(initiallyActiveItem);
                }, 100);
            }

            menuBar.addEventListener('mousemove', (e) => {
                const hoveredItem = e.target.closest('.menu-item');
                if (hoveredItem) {
                    positionBlurPill(hoveredItem);
                }
            });

            menuBar.addEventListener('mouseleave', () => {
                positionBlurPill(null);
            });
        });
