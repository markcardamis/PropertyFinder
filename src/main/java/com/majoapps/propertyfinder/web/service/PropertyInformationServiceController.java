package com.majoapps.propertyfinder.web.service;

import static com.majoapps.propertyfinder.web.util.SpecificationUtil.to_tsquery;

import com.majoapps.propertyfinder.business.domain.PropertyInformationDTO;
import com.majoapps.propertyfinder.business.service.PropertyInformationService;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.projection.AddressList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/propertyinformation")
public class PropertyInformationServiceController {

    @Autowired
    private PropertyInformationService propertyInformationService;

    @RequestMapping(value = "{propertyId}", method = RequestMethod.GET)
    public PropertyInformationDTO getPropertyById(@PathVariable(value="propertyId") Integer id) {
        return propertyInformationService.getPropertyInformation(id);
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    public List<AddressList> getPropertyInformationByElasticSearch(@RequestParam(value="address") String address) {
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
