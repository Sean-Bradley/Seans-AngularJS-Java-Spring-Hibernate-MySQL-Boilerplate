package com.javaSpringRestAPI.model;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 *
 * @author Sean Bradley
 */
@Entity(name = "cats")
@EntityListeners(AuditingEntityListener.class)
//@JsonIgnoreProperties(value = {"createdDate", "updatedAt"}, allowGetters = true)

public class Cat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String genus = "felis";

    @Column(nullable = false)
    private String name = "";

    @Column(nullable = false, name = "isHungry", columnDefinition = "tinyint(1) default '1'")
    private Boolean isHungry = true;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdDate;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date lastFedDate;

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @return the genus
     */
    public String getGenus() {
        return genus;
    }

    /**
     * @param genus the genus to set
     */
    public void setGenus(String genus) {
        this.genus = genus;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the isHungry
     */
    public Boolean getIsHungry() {
        return isHungry;
    }

    /**
     * @param isHungry the isHungry to set
     */
    public void setIsHungry(Boolean isHungry) {
        this.isHungry = isHungry;
    }

    /**
     * @return the lastFedDate
     */
    public Date getLastFedDate() {
        return lastFedDate;
    }

    /**
     * @return the createdDate
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * @param lastFedDate the lastFedDate to set
     */
    public void setLastFedDate(Date lastFedDate) {
        this.lastFedDate = lastFedDate;
    }

}
