// |--------------------------------------------------------------------------
// | Limiter
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// |
// | Morten Nissen
// | hjemmesidekongen.dk
// |

var limiter = (function ($) {
    'use strict';

    var pub = {},
        identifiers = {
            'limiter': '.limiter',
            'limiter_item': '.limiter__item',
            'hidden_limiter_item': '.limiter__item--hidden',
            'limiter_toggle': '.limiter__toggle'
        },
        class_names = {
            'limiter': 'limiter',
            'limiter_item': 'limiter__item',
            'hidden_limiter_item': 'limiter__item--hidden',
            'limiter_toggle': 'limiter__toggle'
        };

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootEventHandlers();
    };

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        cycle();
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {
        var $toggles = $(identifiers.limiter_toggle);

        if ($toggles.length === 0) {
            return false;
        }

        // Run through all toggles and attach a click event
        $toggles.each(function(index, element) {
            var $toggle = $(this);

            $toggle.on('click', function(event) {
                var $parent = $(this).parents(identifiers.limiter);

                // Remove hidden class
                $parent
                    .find(identifiers.hidden_limiter_item)
                    .removeClass(class_names.hidden_limiter_item);

                $(this).hide();
            });
        });
    }

    /**
     * Cycle through all items.
     */
    function cycle() {
        var $limiters = $(identifiers.limiter);

        if ($limiters.length === 0) {
            return false;
        }

        // Run through all limiters
        $limiters.each(function(index, element) {
            var $limiter = $(this), 
                $limiter_items = $(this).find(identifiers.limiter_item),
                visible_items = $limiter.data('limiter-items'),
                integer = 0;

            if ($limiter_items.length === 0) {
                return true; // Skips to next iteration
            }

            // Run through all limiter items
            $limiter_items.each(function(index, element) {
                var $limiter_item = $(this);

                if ($limiter_item.hasClass(class_names.hidden_limiter_item)) {
                    return true; // Skips to next iteration
                }

                if (integer >= visible_items) {
                    $limiter_item.addClass(class_names.hidden_limiter_item);
                }

                integer++;
            });
        });
    }

    /**
     * Refresh.
     */
    pub.refresh = function() {
        cycle();

        return true;
    }

    return pub;
})(jQuery);
