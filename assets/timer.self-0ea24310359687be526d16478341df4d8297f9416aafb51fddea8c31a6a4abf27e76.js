(function() {
  var ADD_TIMER_FORM_ID, ALERT_WARNING_MODAL_ID, MEMBERS_GLYPHICON_CLASS, MEMBERS_LIST_ITEM_CLASS, NONMEMBERS_GLYPHICON_CLASS, NONMEMBERS_LIST_ITEM_CLASS, ROCK_NUMBER_INPUT_LIST_ID, ROOT_DOCUMENT_CLASS, SECONDS_UNTIL_ORE_RESPAWN, SPEC_WORLD_TIMER_ITEM_TEMPLATE_ID, START_TIMER_ID, WORLD_LIST, WORLD_LIST_IDS, WORLD_LIST_INSTANCE_CLASS, WORLD_LIST_ITEM_TEMPLATE_ID, WORLD_LIST_MAX_COLUMNS, WORLD_LIST_ONE_ROCK_CLASS, WORLD_LIST_TWO_ROCKS_CLASS, WORLD_NUMBER_DIV_CLASS, WORLD_NUMBER_INPUT_ID, WORLD_TIMER_ITEM_REFRESH_CLASS, WORLD_TIMER_ITEM_REMOVE_CLASS, WORLD_TIMER_ITEM_TEMPLATE_ID, WORLD_TIMER_LIST_ID, WORLD_TIMER_LIST_ITEM_CLASS, distribute_world_list, generate_tag_from_world, populate_world_list, refresh_timer_click_event, remove_timer_click_event, show_info_modal, start_countdown, start_timer_click_event, update_world_list, world_input_change_event, world_list_item_click_event, world_tracker_map;

  ALERT_WARNING_MODAL_ID = 'alert-modal';

  ROOT_DOCUMENT_CLASS = 'rune-document';

  WORLD_LIST_ITEM_TEMPLATE_ID = 'world-list-item-template';

  WORLD_TIMER_ITEM_TEMPLATE_ID = 'world-timer-item-template';

  SPEC_WORLD_TIMER_ITEM_TEMPLATE_ID = 'spec-world-timer-item-template';

  WORLD_TIMER_LIST_ID = 'world-timer-list';

  WORLD_LIST_MAX_COLUMNS = 4;

  WORLD_LIST_IDS = ['world-list-1', 'world-list-2', 'world-list-3', 'world-list-4'];

  WORLD_LIST_INSTANCE_CLASS = 'world-list';

  WORLD_LIST_ONE_ROCK_CLASS = 'world-list-item-one-rock';

  WORLD_LIST_TWO_ROCKS_CLASS = 'world-list-item-two-rocks';

  WORLD_TIMER_ITEM_REFRESH_CLASS = 'timer-item-refresh';

  WORLD_TIMER_ITEM_REMOVE_CLASS = 'timer-item-remove';

  WORLD_LIST = [[301, false], [302, true], [303, true], [304, true], [305, true], [306, true], [308, false], [309, true], [310, true], [311, true], [312, true], [313, true], [314, true], [316, false], [317, true], [318, true], [319, true], [320, true], [321, true], [322, true], [325, true], [326, false], [327, true], [328, true], [329, true], [330, true], [333, true], [334, true], [335, false], [336, true], [337, true], [338, true], [341, true], [342, true], [343, true], [344, true], [345, true], [346, true], [349, true], [350, true], [351, true], [352, true], [353, true], [354, true], [357, true], [358, true], [359, true], [360, true], [361, true], [362, true], [365, true], [366, true], [367, true], [368, true], [369, true], [370, true], [373, true], [374, true], [375, true], [376, true], [377, true], [378, true], [381, false], [382, false], [383, false], [384, false], [385, false], [386, true], [393, false], [394, false]];

  MEMBERS_GLYPHICON_CLASS = "glyphicon glyphicon-star";

  MEMBERS_LIST_ITEM_CLASS = "world-list-item-member";

  NONMEMBERS_GLYPHICON_CLASS = "glyphicon glyphicon-star-empty";

  NONMEMBERS_LIST_ITEM_CLASS = "world-list-item-nonmember";

  ADD_TIMER_FORM_ID = 'add-timer-form';

  WORLD_NUMBER_INPUT_ID = 'world-number-input';

  ROCK_NUMBER_INPUT_LIST_ID = 'rock-number-input-list';

  WORLD_TIMER_LIST_ITEM_CLASS = 'world-timer';

  WORLD_NUMBER_DIV_CLASS = 'world-number';

  START_TIMER_ID = 'start-timer';

  SECONDS_UNTIL_ORE_RESPAWN = 12 * 60;

  world_tracker_map = {};

  generate_tag_from_world = function(world_info) {
    var is_members_world, tag, world_number, world_number_node;
    tag = $("#" + WORLD_LIST_ITEM_TEMPLATE_ID).clone();
    tag.attr('id', '');
    tag.show();
    world_number = world_info[0];
    is_members_world = world_info[1];
    if (is_members_world) {
      tag.addClass(MEMBERS_LIST_ITEM_CLASS);
      tag.children().first().addClass(MEMBERS_GLYPHICON_CLASS);
    } else {
      tag.addClass(NONMEMBERS_LIST_ITEM_CLASS);
      tag.children().first().addClass(NONMEMBERS_GLYPHICON_CLASS);
    }
    world_number_node = document.createElement('b');
    $(world_number_node).text(world_number.toString());
    tag.append(world_number_node);
    return tag;
  };

  distribute_world_list = function(world_list, num_columns) {
    var columns_list, i, j, max_column_length, world, _i, _j;
    max_column_length = Math.floor(world_list.length / num_columns);
    if (world_list.length % num_columns !== 0) {
      ++max_column_length;
    }
    columns_list = [];
    for (i = _i = 0; _i < num_columns; i = _i += 1) {
      columns_list[i] = [];
      for (j = _j = 0; _j < max_column_length; j = _j += 1) {
        if (!(world_list.length !== 0)) {
          continue;
        }
        world = world_list.shift();
        columns_list[i].push(world);
      }
    }
    return columns_list;
  };

  populate_world_list = function(distributed_worlds) {
    var i, minimum_length, world, world_list, world_list_div, world_list_tags, _i;
    minimum_length = Math.min(distributed_worlds.length, WORLD_LIST_IDS.length);
    for (i = _i = 0; _i < minimum_length; i = _i += 1) {
      world_list = distributed_worlds[i];
      world_list_div = $("#" + WORLD_LIST_IDS[i]);
      world_list_tags = (function() {
        var _j, _len, _results;
        _results = [];
        for (_j = 0, _len = world_list.length; _j < _len; _j++) {
          world = world_list[_j];
          _results.push(generate_tag_from_world(world));
        }
        return _results;
      })();
      world_list_div.append(world_list_tags);
    }
  };

  update_world_list = function() {
    var rock_trackers, world_item, world_list, world_lists, world_number, _i, _j, _len, _len1;
    world_lists = $("." + WORLD_LIST_INSTANCE_CLASS);
    for (_i = 0, _len = world_lists.length; _i < _len; _i++) {
      world_list = world_lists[_i];
      world_list = $(world_list).children();
      for (_j = 0, _len1 = world_list.length; _j < _len1; _j++) {
        world_item = world_list[_j];
        world_item = $(world_item);
        world_number = parseInt(world_item.children().last().text());
        rock_trackers = world_tracker_map[world_number];
        world_item.removeClass("" + WORLD_LIST_ONE_ROCK_CLASS + " " + WORLD_LIST_TWO_ROCKS_CLASS);
        if (rock_trackers && rock_trackers.length === 1) {
          world_item.addClass("" + WORLD_LIST_ONE_ROCK_CLASS);
        } else if (rock_trackers && rock_trackers.length === 2) {
          world_item.addClass("" + WORLD_LIST_TWO_ROCKS_CLASS);
        }
      }
    }
  };

  start_countdown = function(seconds, display) {
    var interval_event, minutes, timer;
    timer = seconds;
    minutes = void 0;
    seconds = void 0;
    interval_event = setInterval(function() {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.text("" + minutes + ":" + seconds);
      if (--timer < 0) {
        return clearInterval(interval_event);
      }
    }, 1000);
    return interval_event;
  };

  show_info_modal = function(message) {
    var alert_modal, message_node, warning_div, warning_div_nodes;
    alert_modal = $("#" + ALERT_WARNING_MODAL_ID);
    warning_div = alert_modal.find('.alert');
    message_node = document.createTextNode(message);
    warning_div_nodes = warning_div.contents();
    if (warning_div_nodes.length > 1) {
      warning_div_nodes.slice(2).remove();
    }
    warning_div.append(message_node);
    alert_modal.modal('show');
  };

  world_list_item_click_event = function(world_node) {
    var world_id;
    world_id = $(world_node.target).contents().last().text();
    $("#" + WORLD_NUMBER_INPUT_ID).val(world_id);
    $("#" + WORLD_NUMBER_INPUT_ID).trigger('paste');
  };

  start_timer_click_event = function(form_node) {
    var form_root, rock_list, rock_number_tag, rock_number_tags, rock_tag, rock_tags, rock_tracker, tag, timer_id, timer_list, timer_node, tracking_rock, tracking_rock_index, tracking_rocks, world_number, world_number_div, world_number_int, world_number_tag, _i, _len;
    tag = $("#" + WORLD_TIMER_ITEM_TEMPLATE_ID).clone();
    form_root = $(form_node.target).closest("#" + ADD_TIMER_FORM_ID);
    world_number = $("#" + WORLD_NUMBER_INPUT_ID).val();
    if (world_number.length === 0) {
      show_info_modal("Enter a world number before starting the timer!");
      return;
    }
    world_number_tag = document.createTextNode(world_number);
    world_number_div = $(tag.children().first().children().get(1));
    world_number_div.children().append(world_number_tag);
    world_number_int = parseInt(world_number);
    rock_list = $("#" + ROCK_NUMBER_INPUT_LIST_ID).children();
    rock_number_tags = $(rock_list.filter(".active"));
    if (rock_number_tags.length === 0) {
      show_info_modal("Select at least one rock to track with this timer!");
      return;
    }
    if (!world_tracker_map[world_number_int]) {
      world_tracker_map[world_number_int] = [];
    }
    rock_tracker = world_tracker_map[world_number_int];
    tracking_rocks = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rock_number_tags.length; _i < _len; _i++) {
        rock_number_tag = rock_number_tags[_i];
        _results.push($(rock_number_tag).children().first().val());
      }
      return _results;
    })();
    Array.prototype.push.apply(rock_tracker, tracking_rocks);
    rock_tags = tag.find('.btn-group').first().children();
    for (_i = 0, _len = tracking_rocks.length; _i < _len; _i++) {
      tracking_rock = tracking_rocks[_i];
      tracking_rock_index = tracking_rock - 1;
      rock_tag = $(rock_tags.get(tracking_rock_index));
      rock_tag.addClass('active');
    }
    timer_list = $("#" + WORLD_TIMER_LIST_ID);
    timer_list.append(tag);
    tag.slideDown('fast');
    timer_node = tag.find("." + WORLD_TIMER_LIST_ITEM_CLASS);
    timer_id = start_countdown(SECONDS_UNTIL_ORE_RESPAWN, timer_node);
    tag.attr('id', timer_id);
    $("#" + WORLD_NUMBER_INPUT_ID).val('');
    $("#" + WORLD_NUMBER_INPUT_ID).trigger('paste');
    update_world_list();
  };

  remove_timer_click_event = function(timer_node) {
    var active_rock_label, active_rock_number, active_rocks_label_list, active_rocks_list, list_item_node, rock_number_position, rocks_label_list, world_number, _i, _len;
    list_item_node = $(timer_node.target).closest('li');
    list_item_node.slideUp('fast', function() {
      return $(this).remove();
    });
    world_number = parseInt(list_item_node.find("." + WORLD_NUMBER_DIV_CLASS).contents().last().text());
    active_rocks_list = world_tracker_map[world_number];
    rocks_label_list = list_item_node.find('.btn-group').first().children();
    active_rocks_label_list = rocks_label_list.filter('.active');
    for (_i = 0, _len = active_rocks_label_list.length; _i < _len; _i++) {
      active_rock_label = active_rocks_label_list[_i];
      active_rock_number = $(active_rock_label).children().first().val();
      rock_number_position = active_rocks_list.indexOf(active_rock_number);
      if (rock_number_position !== -1) {
        active_rocks_list.splice(rock_number_position, 1);
      }
    }
    $("#" + WORLD_NUMBER_INPUT_ID).trigger('paste');
    update_world_list();
  };

  refresh_timer_click_event = function(timer_node) {
    var new_timer_id, old_timer_id, timer_element, timer_node_element, timers_list;
    timer_element = $(timer_node.target).closest('li');
    old_timer_id = parseInt(timer_element.attr('id'));
    clearInterval(old_timer_id);
    timers_list = timer_element.parent().children();
    timer_element.insertAfter(timers_list.last());
    timer_node_element = timer_element.find("." + WORLD_TIMER_LIST_ITEM_CLASS);
    new_timer_id = start_countdown(SECONDS_UNTIL_ORE_RESPAWN, timer_node_element);
    timer_element.attr('id', new_timer_id);
  };

  world_input_change_event = function(input_node) {
    var current_tracked_ores, rock_index, rock_input, rock_input_list, rock_number, world_input_node, world_number, _i, _len;
    world_input_node = $(input_node.target);
    world_number = parseInt(world_input_node.val()) || -1;
    current_tracked_ores = world_tracker_map[world_number] || [];
    rock_input_list = $("#" + ROCK_NUMBER_INPUT_LIST_ID).children();
    rock_input_list.show();
    rock_input_list.removeClass('active');
    for (_i = 0, _len = current_tracked_ores.length; _i < _len; _i++) {
      rock_number = current_tracked_ores[_i];
      rock_index = rock_number - 1;
      rock_input = $(rock_input_list[rock_index]);
      rock_input.hide();
    }
  };

  $(document).ready(function() {
    var distributed_worlds;
    distributed_worlds = distribute_world_list(WORLD_LIST, WORLD_LIST_MAX_COLUMNS);
    populate_world_list(distributed_worlds);
    $(document).on('mousedown', "." + WORLD_LIST_INSTANCE_CLASS, world_list_item_click_event);
    $(document).on('click', "#" + START_TIMER_ID, start_timer_click_event);
    $(document).on('click', "." + WORLD_TIMER_ITEM_REMOVE_CLASS, remove_timer_click_event);
    $(document).on('click', "." + WORLD_TIMER_ITEM_REFRESH_CLASS, refresh_timer_click_event);
    $(document).on('keyup paste', "#" + WORLD_NUMBER_INPUT_ID, world_input_change_event);
  });

}).call(this);
