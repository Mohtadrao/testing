'use strict';

jQuery(window).on('elementor/frontend/init', function () {
    if ( theme.is_editor_preview ) {
        if(jQuery('.page-title-container.page-title-decorated').length) {
            jQuery('.page-title-container.page-title-decorated').addClass('animated');
        }
        footerDecorationAnimate();
    }
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_blog_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 300);
            setTimeout(fix_responsive_iframe, 600);
            setTimeout(custom_video_play_button, 800);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_case_study_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            setTimeout(isotope_init, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_portfolio_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            setTimeout(isotope_init, 500);
            setTimeout(updatePortfolioSliderOffset, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_services_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_step_carousel.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
    });    
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_projects_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            setTimeout(isotope_init, 500);
            setTimeout(handleProjectsExcerptHeight, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_testimonial_carousel.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_image_carousel.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
        if($scope.hasClass('view-type-3')) {
            const borderWidthLeft = parseInt(window.getComputedStyle($scope.find('.slider-item-inner')[0], null).getPropertyValue('border-left-width'));
            const borderWidthRight = parseInt(window.getComputedStyle($scope.find('.slider-item-inner')[0], null).getPropertyValue('border-right-width'));
            $scope.find('.slider-wrapper').css({
                'margin-left': -borderWidthLeft + 'px',
                'margin-right': -borderWidthRight + 'px'
            });
        }
        if($scope.find('.cursor_drag').length > 0 && jQuery(window).width() >= 992) {
            const $slider = $scope.find('.slider-container');
            const cursor = jQuery('.cursor_drag', $scope);
            function showCustomCursor(event) {
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }
            $slider.mousemove(showCustomCursor);

            $slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'auto'});
                    cursor.removeClass('active');
                    setTimeout(function() {
                        if(!cursor.hasClass('active')) {
                            cursor.hide();
                        }
                    }, 300); 
                }    
            });

            $slider.mouseenter(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);  
                } 
            });
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_content_slider.default', function ($slider) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            if(jQuery('.slider-decoration', $slider).length) {
                jQuery('.slider-decoration', $slider).addClass('animated');
            }
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/section.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_wpforms.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(initFloatPlaceholderInput, 500);
            setTimeout(wpFormsSubmitButtonSVG, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_history_carousel.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
        if(jQuery(window).width() >= 992) {
            const $slider = $scope.find('.history-slider-container');
            const cursor = jQuery('.cursor_drag', $scope);
            function showCustomCursor(event) {
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }
            $slider.mousemove(showCustomCursor);

            $slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'auto'});
                    cursor.removeClass('active');
                    setTimeout(function() {
                        if(!cursor.hasClass('active')) {
                            cursor.hide();
                        }
                    }, 300); 
                }    
            });

            $slider.mouseenter(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);  
                } 
            });
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/progress.default', function (e) {
        let right = 100 - e.find('.elementor-progress-bar').data('max');
        if(!!theme.rtl) {
            e.find('.elementor-progress-percentage').css('left', right + '%'); 
        } else {
            e.find('.elementor-progress-percentage').css('right', right + '%');  
        }
    });

    elementorFrontend.hooks.addAction('frontend/element_ready/industrium_price_item.default', function (el) {
        function priceItemBestheight() {
            if (jQuery(window).width() >= 768 && jQuery('.price-item-best-wrapper', el).length > 0) {
                const bestHeigth = el.find('.price-item-inner').innerHeight();
                jQuery('.price-item-best-wrapper', el).width(bestHeigth);
            } else {
                jQuery('.price-item-best-wrapper', el).width('auto');
            }
        }
        priceItemBestheight();
        jQuery(window).on('resize', function () {
            priceItemBestheight();
        });
    }); 
});

;