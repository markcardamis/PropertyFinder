package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.majoapps.propertyfinder.exception.MethodArgumentNotValidException;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import java.io.Serializable;
import lombok.Data;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OktaUserDTO implements Serializable {  
    private static final long serialVersionUID = 8818754781425276140L;

    @JsonProperty("firstName") private String firstName;
    @JsonProperty("lastName") private String lastName;
    @JsonProperty("email") private String email;
    @JsonProperty("password") private String password;
    
    public static JSONObject convertToOktaUser (OktaUserDTO oktaUserDTO) {
        try {
            if (oktaUserDTO.getFirstName() == null || oktaUserDTO.getFirstName().isEmpty()) {
                throw new MethodArgumentNotValidException("First name cannot be null");
            }
            if (oktaUserDTO.getLastName() == null || oktaUserDTO.getLastName().isEmpty()) {
                throw new MethodArgumentNotValidException("Last name cannot be null");
            }
            if (oktaUserDTO.getEmail() == null || oktaUserDTO.getEmail().isEmpty()) {
                throw new MethodArgumentNotValidException("Email cannot be null");
            }
            if (oktaUserDTO.getPassword() == null || oktaUserDTO.getPassword().isEmpty()) {
                throw new MethodArgumentNotValidException("Password cannot be null");
            }
            JSONObject jsonObject = new JSONObject(); // Host object
            JSONObject profile = new JSONObject();     
            JSONObject credentials = new JSONObject();
            JSONObject value = new JSONObject();
            JSONArray groupIds = new JSONArray();
            String groupId = System.getenv().get("OKTA_GROUP_ID");

            profile.appendField("firstName", oktaUserDTO.getFirstName());
            profile.appendField("lastName", oktaUserDTO.getLastName());
            profile.appendField("email", oktaUserDTO.getEmail());
            profile.appendField("login", oktaUserDTO.getEmail());
            value.appendField("value", oktaUserDTO.getPassword());
            credentials.appendField("password", value);
            groupIds.appendElement(groupId);
            jsonObject.appendField("profile", profile);
            jsonObject.appendField("credentials", credentials);
            jsonObject.appendField("groupIds", groupIds);

            return jsonObject;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Cannot create new user : " + e.getLocalizedMessage());
        }
    }

}

