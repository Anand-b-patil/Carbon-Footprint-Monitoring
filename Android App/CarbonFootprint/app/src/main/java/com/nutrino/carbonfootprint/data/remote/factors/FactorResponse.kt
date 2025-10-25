package com.nutrino.carbonfootprint.data.remote.factors

import kotlinx.serialization.Serializable

@Serializable
data class FactorResponse(
    val id: Int,
    val namespace: String,
    val category: String,
    val unit_in: String,
    val unit_out: String,
    val factor_value: Double,
    val gwp_horizon: Int,
    val geography: String,
    val vendor: String,
    val method: String,
    val valid_from: String,
    val valid_to: String,
    val version: Int
)
