package com.discovery.sea.afn.models.impl;

import org.apache.sling.api.resource.Resource;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;

@Model(adaptables = Resource.class, resourceType = { CustomHeadingModel.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class CustomHeadingModel implements ComponentExporter {
 
    static final String RESOURCE_TYPE = "afn/components/structure/header";
    
    @Nonnull
	@ValueMapValue(name = "logoImgPath")
    @Default(values = "")
	private String logoImgPath;

	@Inject
    @Named("sling:resourceType")
    String slingResourceType;
 
    public String getSlingResourceType() {
        return slingResourceType;
    }
 
    public String getLogoImgPath() {
    	return logoImgPath;
    }

    @Override
    public String getExportedType() {

        return RESOURCE_TYPE;
    }
}