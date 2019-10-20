package com.majoapps.propertyfinder.web.application;

import com.majoapps.propertyfinder.business.service.NotificationsService;
import com.majoapps.propertyfinder.data.entity.Notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping(value="/notifications")
public class NotificationsController {
    @Autowired
    private NotificationsService notificationsService;

    @Autowired
    public NotificationsController(NotificationsService notificationsService){
        super();
        this.notificationsService = notificationsService;
    }

    @RequestMapping(method= RequestMethod.GET)
    public String getNotifications(@RequestParam(value="notifications_id") UUID id, Model model){
        List<Notifications> getNotificationsById = this.notificationsService.getNotifications(id);
        model.addAttribute("notifications", getNotificationsById);
        return "notifications";
    }
}
