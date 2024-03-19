package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notify_tb")
public class Notify {

	@Id
	@Column(name = "notify_code")
	private int notifyCode;

	@Column(name = "user_code")
	private long userCode;

	@Column(name = "notify_content")
	private String notifyContent;

	@Column(name = "is_checked")
	private int isChecked;

	@Column(name = "created_time")
	@CurrentTimestamp
	private LocalDateTime createdTime;

}