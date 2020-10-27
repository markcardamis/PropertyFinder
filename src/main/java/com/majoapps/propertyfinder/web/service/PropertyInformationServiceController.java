package com.majoapps.propertyfinder.web.service;

import static com.majoapps.propertyfinder.web.util.SpecificationUtil.to_tsquery;

import com.majoapps.propertyfinder.business.domain.PropertyInformationDTO;
import com.majoapps.propertyfinder.business.domain.PropertyInformationResponseDTO;
import com.majoapps.propertyfinder.business.domain.PropertyInformationSearchDTO;
import com.majoapps.propertyfinder.business.service.PropertyInformationService;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.projection.AddressListView;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/propertyinformation")
public class PropertyInformationServiceController {

    @Autowired
    private PropertyInformationService propertyInformationService;

    @RequestMapping(method = RequestMethod.GET)
    public List<PropertyInformationResponseDTO> getAllPropertyInformationByQuery(
            JwtAuthenticationToken JwtAuthToken, 
            PropertyInformationSearchDTO propertyInformation,
            @RequestHeader(value = "centreLatitude", required = false) Double latitude,
            @RequestHeader(value = "centreLongitude", required = false) Double longitude) {
        return propertyInformationService.queryHQL(JwtAuthToken, propertyInformation, latitude, longitude);
    }

    @RequestMapping(value = "{propertyId}", method = RequestMethod.GET)
    public PropertyInformationDTO getPropertyById(JwtAuthenticationToken JwtAuthToken,
                                                  @PathVariable(value="propertyId") Integer id) {
        return propertyInformationService.getPropertyInformation(JwtAuthToken, id);
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    public List<AddressListView> getPropertyInformationByElasticSearch(@RequestParam(value="address") String address) {
        return propertyInformationService.getByElasticSearch(to_tsquery(address));
    }

    @Profile("!production")
    @RequestMapping(value = "{propertyId}", method = RequestMethod.PUT)
    public ResponseEntity<PropertyInformation> updatePropertyInformation(
            @PathVariable(value="propertyId") Integer id, 
            @RequestBody PropertyInformation propertyInformation) {
        return propertyInformationService.updatePropertyInformation(id, propertyInformation);
    }

    @Profile("!production")
    @RequestMapping(value = "{propertyId}", method = RequestMethod.PATCH)
    public ResponseEntity<PropertyInformation> partialUpdatePropertyInformation(
            @PathVariable(value="propertyId") Integer id, 
            @RequestBody PropertyInformation propertyInformation) {
        return propertyInformationService.partialUpdatePropertyInformation(id, propertyInformation);
    }

}
