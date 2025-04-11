/**
 * Filters Module - Handles portfolio and skills filters
 */

export default class Filters {
    constructor() {
        this.portfolioFilters = document.querySelectorAll('.portfolio-filter');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.skillCategoryBtns = document.querySelectorAll('.skill-category-btn');
        this.skillTiles = document.querySelectorAll('.skill-tile');

        this.init();
    }

    init() {
        this.initPortfolioFilters();
        this.initSkillFilters();
    }

    initPortfolioFilters() {
        if (!this.portfolioFilters.length || !this.portfolioItems.length) return;

        this.portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                this.portfolioFilters.forEach(f => f.classList.remove('active'));

                // Add active class to clicked filter
                filter.classList.add('active');

                const filterValue = filter.getAttribute('data-filter');

                // Show/hide portfolio items based on filter
                this.portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    initSkillFilters() {
        if (!this.skillCategoryBtns.length || !this.skillTiles.length) return;

        this.skillCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all category buttons
                this.skillCategoryBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                // Show/hide skill tiles based on category
                this.skillTiles.forEach(tile => {
                    if (category === 'all' || tile.getAttribute('data-category') === category) {
                        tile.style.display = 'flex';
                    } else {
                        tile.style.display = 'none';
                    }
                });
            });
        });
    }
} 