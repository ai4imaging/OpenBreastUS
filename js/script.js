// js/script.js
$(document).ready(function() {
    // 基准测试标签切换
    $('.tab-btn').on('click', function() {
        // 移除所有激活状态
        $('.tab-btn').removeClass('active');
        $('.tab-pane').removeClass('active');
        
        // 设置当前激活状态
        const tabId = $(this).data('tab');
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
    });

    // 数据集标签切换
    $('.dataset-tab').on('click', function(e) {
        e.preventDefault();
        // 移除所有激活状态
        $('.dataset-tab').removeClass('active');
        $('.dataset-pane').removeClass('active');
        
        // 设置当前激活状态
        const target = $(this).attr('href');
        $(this).addClass('active');
        $(target).addClass('active');
    });
});

// 在js/script.js中添加
// URL哈希记忆功能
function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
        const $tab = $(`[href="${hash}"]`);
        if ($tab.length) {
            $tab.trigger('click');
        }
    }
}

// 初始化时检查哈希
handleHashChange();

// 监听哈希变化
$(window).on('hashchange', handleHashChange);

// 添加导航栏激活状态控制
function updateNavHighlight() {
    const scrollPos = $(window).scrollTop();
    const navLinks = $('.sticky-nav a');
    
    // 移除所有激活状态
    navLinks.removeClass('active');
    
    // 根据滚动位置判断激活状态
    $('section').each(function() {
        const sectionTop = $(this).offset().top - 100;
        const sectionBottom = sectionTop + $(this).outerHeight();
        const sectionId = $(this).attr('id');

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            $(`.sticky-nav a[href="#${sectionId}"]`).addClass('active');
        }
    });
}

// 初始化事件监听
$(document).ready(function() {
    // 页面加载时检测
    updateNavHighlight();
    
    // 滚动事件监听
    $(window).scroll(_.throttle(updateNavHighlight, 100));
    
    // 导航点击事件
    $('.sticky-nav a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // 更新激活状态
        $('.sticky-nav a').removeClass('active');
        $(this).addClass('active');
        
        // 平滑滚动到目标位置
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 800);
    });
});