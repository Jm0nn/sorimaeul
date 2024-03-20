package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dub_tb")
public class Dubbing {

    @Id
    @Column(name = "dub_code")
    private int dubCode;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private User user;

    @ManyToOne
    @JoinColumn(name = "video_source_code")
    private VideoSource videoSource;

    @Column(name = "dub_name")
    private String dubName;

    @Column(name = "dub_detail")
    private String dubDetail;

    @Column(name = "storage_path")
    private String storagePath;

    @Builder.Default
    @Column(name = "is_public")
    private Boolean isPublic = false;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @CreationTimestamp
    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Builder.Default
    @Column(name = "like_count")
    private int likeCount = 0;
}
