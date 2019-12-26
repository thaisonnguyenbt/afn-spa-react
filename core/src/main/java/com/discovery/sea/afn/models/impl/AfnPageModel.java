package com.discovery.sea.afn.models.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { AfnPageModel.class, ComponentExporter.class }, resourceType = AfnPageModel.RESOURCE_TYPE)
@Exporter(name = "jackson", extensions = "json", options = {})
@JsonSerialize(as = AfnPageModel.class)
public class AfnPageModel implements ComponentExporter {

    static final String RESOURCE_TYPE = "afn/components/structure/pagexx";

    @ChildResource(name = "newsItems", injectionStrategy = InjectionStrategy.OPTIONAL)
    private List<NewsItems> newsItems = new ArrayList<NewsItems>();

    public List<NewsItems> getNewsItems() {

        return newsItems;

    }

    public void setNewsItems(List<NewsItems> newsItems) {

        this.newsItems = newsItems;

    }

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public static class NewsItems {

        @Optional
        @ValueMapValue
        @Named("title")
        private String title;

        @Optional
        @ValueMapValue
        @Named("link")
        private String link;

        @Optional
        @ValueMapValue
        @Named("description")
        private String description;

        public String getTitle() {
            return title;

        }

        public void setTitle(String title) {
            this.title = title;

        }

        public String getLink() {
            return link;

        }

        public void setLink(String link) {
            this.link = link;

        }

        public String getDescription() {
            return description;

        }

        public void setDescription(String description) {
            this.description = description;

        }

    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;

    }

}