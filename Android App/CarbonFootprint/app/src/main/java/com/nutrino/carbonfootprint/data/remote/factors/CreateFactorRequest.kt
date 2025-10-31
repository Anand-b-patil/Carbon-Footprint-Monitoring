package com.nutrino.carbonfootprint.data.remote.factors

import kotlinx.serialization.Serializable

@Serializable
data class CreateFactorRequest(
    val namespace: String = "global",
    val category: String = "",
    val unit_in: String = "",
    val unit_out: String = "",
    val factor_value: Double = 0.0,
    val gwp_horizon: Int = 100,
    val geography: String = "GLOBAL",
    val vendor: String = "",
    val method: String = "",
    val valid_from: String = "",
    val valid_to: String = "",
    val version: Int = 1
)
